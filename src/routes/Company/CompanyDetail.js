import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Review from '../Feedback/Review';
import CompanyBreadCrumbs from '../../components/Company/CompanyDetail/CompanyBreadcrumbs';
import CompanyInfo from '../../components/Company/CompanyDetail/CompanyInfo';
import { firestore } from '../../config/firebase';
import { useParams } from 'react-router';


const useStyles = makeStyles({
    root: {
        marginLeft: 50,
        marginRight: 50
    }
});

export default function CompanyDetail() {
    const classes = useStyles();
    const { companyId } = useParams();
    const [company, setCompany] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        (async () => {
            const _company = (await firestore.collection('companies').doc(companyId).get()).data()
            _company.id = companyId;
            setCompany(_company);
        })();
        console.log(1)
    }, [companyId,reload]);

    return (
        <div>
            { company && (
                <div className={classes.root}>
                    <CompanyBreadCrumbs company={company} />
                    <CompanyInfo company={company} reviews={reviews} setReviews={setReviews} setCompany={setCompany} reload={reload} setReload={setReload}/>
                    <Review company={company} reviews={reviews} setReviews={setReviews} />
                </div>
            ) }
        </div>
    )
}
