import Book from '../models/Book.js';
import Review from '../models/Review.js';

export const createBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear } = req.body;
    const newBook = new Book({
      title,
      author,
      genre,
      publishedYear,
      createdBy: req.user.userId  // comes from JWT
    });
    await newBook.save();
    res.status(201).json({ message: 'Book created successfully', book: newBook });
  } catch (err) {
    console.error("Create book error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllBooks = async (req, res) => {
    try {
      const { author, genre, page = 1, limit = 10 } = req.query;
  
      const filter = {};
      if (author) filter.author = new RegExp(author, 'i'); // case-insensitive
      if (genre) filter.genre = new RegExp(genre, 'i');
  
      const books = await Book.find(filter)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      const total = await Book.countDocuments(filter);
  
      res.status(200).json({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        books
      });
    } catch (err) {
      console.error('Get books error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
export const getBookById = async (req, res) => {
    try {
      const { id } = req.params;
      const { page = 1, limit = 5 } = req.query;
  
      const book = await Book.findById(id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
  
      const reviews = await Review.find({ book: id })
        .populate('user', 'username') // optional: show username
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      const totalReviews = await Review.countDocuments({ book: id });
      const avgRatingAgg = await Review.aggregate([
        { $match: { book: book._id } },
        { $group: { _id: null, avgRating: { $avg: "$rating" } } }
      ]);
      const averageRating = avgRatingAgg[0]?.avgRating || 0;
  
      res.status(200).json({
        book,
        averageRating: averageRating.toFixed(2),
        totalReviews,
        reviews
      });
    } catch (err) {
      console.error('Get book by ID error:', err);
      res.status(500).json({ message: 'Server error' });
    }
};

export const searchBooks = async (req, res) => {
    try {
      const { q } = req.query;
  
      if (!q) {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
      }
  
      // Case-insensitive partial match on title OR author
      const regex = new RegExp(q, 'i');
  
      const books = await Book.find({
        $or: [{ title: regex }, { author: regex }],
      });
  
      res.status(200).json({ results: books });
    } catch (err) {
      console.error('Search error:', err);
      res.status(500).json({ message: 'Server error' });
    }
};
  