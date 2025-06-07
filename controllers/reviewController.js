import Review from '../models/Review.js';
import Book from '../models/Book.js';

export const addReview = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.userId;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Check if user already reviewed this book
    const existing = await Review.findOne({ book: bookId, user: userId });
    if (existing) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({ book: bookId, user: userId, rating, comment });
    await review.save();

    res.status(201).json({ message: 'Review submitted', review });
  } catch (err) {
    console.error('Add review error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateReview = async (req, res) => {
    try {
      const { id } = req.params; // review ID
      const { rating, comment } = req.body;
      const userId = req.user.userId;
  
      const review = await Review.findById(id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
  
      if (review.user.toString() !== userId)
        return res.status(403).json({ message: 'Unauthorized to update this review' });
  
      if (rating) review.rating = rating;
      if (comment) review.comment = comment;
  
      await review.save();
      res.status(200).json({ message: 'Review updated', review });
    } catch (err) {
      console.error('Update review error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const deleteReview = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.userId;
  
      const review = await Review.findById(id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
  
      if (review.user.toString() !== userId)
        return res.status(403).json({ message: 'Unauthorized to delete this review' });
  
      await Review.findByIdAndDelete(id);
      res.status(200).json({ message: 'Review deleted' });
    } catch (err) {
      console.error('Delete review error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  