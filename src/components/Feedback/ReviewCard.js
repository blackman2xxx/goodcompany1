import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardHeader, CardContent, Typography, Box} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        marginBottom: 10
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row'
    },
    cardHeaderRating: {
        padding: 0,
        marginLeft: 10
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export default function ReviewCard({ review }) {
    const classes = useStyles();
    console.log(review)

    return (
        <Card className={classes.root}>
            <CardHeader
                title={
                    <div className={classes.cardHeader}>
                        <div style={{ display: 'flex', flex: 9 }}>
                            <span>{review.reviewer} ({review.position})</span>
                            <Box component="fieldset" mb={3} borderColor="transparent" className={classes.cardHeaderRating}>
                                <Rating name="read-only" value={review.rating} precision={1} readOnly />
                            </Box>
                        </div>
                        <span style={{ fontSize: 18, color: 'grayText', flex: 1 }}>{moment(review.created_at).format('DD/MM/YYYY HH:mm')}</span>
                    </div>
                }
                style={{ paddingBottom: 0 }}
            />
            <CardContent style={{ paddingTop: 0 }}>
                <Typography variant="body1" color="textPrimary" component="h5">
                    { review.text }
                </Typography>
            </CardContent>
            {}
        </Card>
    );
}
