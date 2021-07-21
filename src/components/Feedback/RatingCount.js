import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardContent,
	CardHeader,
	Box,
	Button,
	MenuItem,
	MenuList,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '100%',
		marginBottom: 10,
	},
	cardHeader: {
		display: 'flex',
		flexDirection: 'row',
	},
	cardHeaderRating: {
		padding: 0,
		marginLeft: 10,
		marginBottom: 0,
	},
}));

export default function RatingCount({
	reviews,
	averageRating,
	setStarFilter,
	starFilter,
}) {
	const classes = useStyles();
	const [count, setCount] = useState({});

	useEffect(() => {
		const fiveStar = reviews.filter((review) => review.rating === 5);
		const fourStar = reviews.filter((review) => review.rating === 4);
		const threeStar = reviews.filter((review) => review.rating === 3);
		const twoStar = reviews.filter((review) => review.rating === 2);
		const oneStar = reviews.filter((review) => review.rating === 1);
		const _count = {
			fiveStar,
			fourStar,
			threeStar,
			twoStar,
			oneStar,
		};
		setCount(_count);
	}, [reviews]);

	return (
		<Card className={classes.root}>
			<CardHeader
				title={
					<div className={classes.cardHeader}>
						<div style={{ display: 'flex' }}>
							<span>Đánh giá ({reviews.length})</span>
							<Box
								component='fieldset'
								mb={3}
								borderColor='transparent'
								className={classes.cardHeaderRating}
							>
								<Rating
									name='read-only'
									value={averageRating}
									precision={1}
									readOnly
								/>
							</Box>
						</div>
					</div>
				}
				style={{ paddingBottom: 0 }}
			/>
			{count.fiveStar && (
				<CardContent style={{ paddingTop: 0, paddingLeft: 0 }}>
					<MenuList style={{ paddingTop: 0 }}>
						<MenuItem onClick={() => setStarFilter(5)}>
							<span style={{ marginRight: 10 }}>5 sao</span>
							<progress
								style={{ height: 30, marginRight: 5 }}
								id='file'
								value={count.fiveStar.length}
								max={reviews.length}
							></progress>
							<span>({count.fiveStar.length})</span>
						</MenuItem>
						<MenuItem onClick={() => setStarFilter(4)}>
							<span style={{ marginRight: 10 }}>4 sao</span>
							<progress
								style={{ height: 30, marginRight: 5 }}
								id='file'
								value={count.fourStar.length}
								max={reviews.length}
							></progress>
							<span>({count.fourStar.length})</span>
						</MenuItem>
						<MenuItem onClick={() => setStarFilter(3)}>
							<span style={{ marginRight: 10 }}>3 sao</span>
							<progress
								style={{ height: 30, marginRight: 5 }}
								id='file'
								value={count.threeStar.length}
								max={reviews.length}
							></progress>
							<span>({count.threeStar.length})</span>
						</MenuItem>
						<MenuItem onClick={() => setStarFilter(2)}>
							<span style={{ marginRight: 10 }}>2 sao</span>
							<progress
								style={{ height: 30, marginRight: 5 }}
								id='file'
								value={count.twoStar.length}
								max={reviews.length}
							></progress>
							<span>({count.twoStar.length})</span>
						</MenuItem>
						<MenuItem onClick={() => setStarFilter(1)}>
							<span style={{ marginRight: 10 }}>1 sao</span>
							<progress
								style={{ height: 30, marginRight: 5 }}
								id='file'
								value={count.oneStar.length}
								max={reviews.length}
							></progress>
							<span>({count.oneStar.length})</span>
						</MenuItem>
					</MenuList>
					{starFilter === 0 ? (
						<p style={{ marginLeft: 20, marginTop: 0 }}>
							Tất cả các đánh giá đã được hiển thị
						</p>
					) : (
						<p style={{ marginLeft: 20, marginTop: 0 }}>
							Đã hiển thị đánh giá <strong>{starFilter}sao</strong>.
							<Button
								color='primary'
								style={{ paddingLeft: 0 }}
								onClick={() => {
									setStarFilter(0);
								}}
							>
								Hiển thị tất cả đánh giá
							</Button>
						</p>
					)}
				</CardContent>
			)}
		</Card>
	);
}
