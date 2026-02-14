import React, { useState } from 'react';
import { Star, User } from 'lucide-react';

const ReviewSection = ({ reviews, onSubmitReview, user }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [hoveredStar, setHoveredStar] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitReview({ rating, comment });
        setComment('');
        setRating(5);
    };

    return (
        <div className="space-y-8 mt-8">
            <h2 className="text-2xl font-bold">Reviews & Ratings</h2>

            {/* Review Form */}
            {user ? (
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold mb-4">Write a Review</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredStar(star)}
                                    onMouseLeave={() => setHoveredStar(0)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star
                                        size={24}
                                        className={`${star <= (hoveredStar || rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-600'
                                            } transition-colors`}
                                    />
                                </button>
                            ))}
                        </div>
                        <textarea
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-500 min-h-[100px] outline-none focus:border-blue-500 transition"
                            placeholder="Share your experience..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition"
                        >
                            Post Review
                        </button>
                    </form>
                </div>
            ) : (
                <div className="glass-card p-6 text-center text-muted-foreground">
                    Please login to write a review.
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No reviews yet. Be the first!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="glass-card p-6 border border-white/5 animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center overflow-hidden">
                                        {review.user?.photo ? (
                                            <img src={review.user.photo} alt={review.user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={20} className="text-blue-400" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">{review.user?.name || 'Anonymous'}</h4>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={12}
                                                    className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-700'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-300 ml-13 pl-13">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
