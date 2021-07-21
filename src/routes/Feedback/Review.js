import { makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import RatingCount from '../../components/Feedback/RatingCount';
import ReviewCard from '../../components/Feedback/ReviewCard';
import {firestore} from '../../config/firebase';

const useStyles = makeStyles(theme => ({
    fullReviews: {
        display: 'flex',
        marginTop: 20
    },
    reviews: {
        flex: 6,
        marginRight: 20
    },
    ratingCount: {
        flex: 2,
        marginTop: theme.spacing(0),
    },

}))

export default function Review({company, reviews, setReviews}) {
    const classes = useStyles();
    const [reviewsFilterByStar, setReviewsFilterByStar] = useState([]);
    const [starFilter, setStarFilter] = useState(0);

    useEffect(() => {
        (async () => {
            let _reviews = [];
            const reviewsRef = firestore.collection('reviews');
            const snapshot = await reviewsRef.where('companyId', '==', company.id).get();
            snapshot.forEach(doc => {
                _reviews = [..._reviews, doc.data()];
            });
            setReviews(_reviews);
        })();
    }, [company]);

    useEffect(() => {
        switch(starFilter){
            case 0: {
                setReviewsFilterByStar(reviews);
                break;
            }
            case 1:{
                const filterReviews = reviews.filter(review => review.rating === 1);
                setReviewsFilterByStar(filterReviews);
                break;
            }
            case 2:{
                const filterReviews = reviews.filter(review => review.rating === 2);
                setReviewsFilterByStar(filterReviews);
                break;
            }
            case 3:{
                const filterReviews = reviews.filter(review => review.rating === 3);
                setReviewsFilterByStar(filterReviews);
                break;
            }
            case 4:{
                const filterReviews = reviews.filter(review => review.rating === 4);
                setReviewsFilterByStar(filterReviews);
                break;
            }
            case 5:{
                const filterReviews = reviews.filter(review => review.rating === 5);
                setReviewsFilterByStar(filterReviews);
                break;
            }
            default: break;
        }
    }, [starFilter, reviews]);

    return (
        <div className={classes.fullReviews}>
            <div className={classes.reviews}>
                {reviewsFilterByStar.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
            <div className={classes.ratingCount}>
                <RatingCount
                    reviews={reviews}
                    averageRating={company.rating}
                    setStarFilter={setStarFilter}
                    starFilter={starFilter}
                />
            </div>
        </div>
    )
}
