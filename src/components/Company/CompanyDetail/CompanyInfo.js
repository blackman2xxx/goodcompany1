import { makeStyles } from '@material-ui/core'
import React from 'react'
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import BusinessIcon from '@material-ui/icons/Business';
import LanguageIcon from '@material-ui/icons/Language';
import ModalReview from "../ModalReview";
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import defaultLogo from '../../../images/sample-logo.png';

const useStyles = makeStyles({
    companyInfo__logo: {
        width: 80,
        height: 80
    },
    companyInfoCompanyPage: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#fff',
        padding: 10
    },
    companyInfo: {
        display: 'flex',
        flex: 8
    },
    companyInfo__detail: {

    },
    companyInfo__name__rating: {
        display: 'flex',
        justifyItems: 'center',
        height: 32
    },
    companyInfo__name: {
        marginTop: 0,
        marginRight: 10,
        marginLeft: 10
    },
    companyInfo__rating: {
        margin: 0,
        paddingTop: 2
    },
    companyInfo__location: {
        display: 'flex',
        marginLeft: 10
    },
    companyInfo__site: {
        display: 'flex',
        marginLeft: 10
    },
    companyInfo__type: {
        display: 'flex',
        marginLeft: 10
    },
    companyAction: {
        flex: 2
    }
})


export default function CompanyInfo({ company, reviews, setReviews, setCompany, reload, setReload }) {
    const classes = useStyles();
    return (
        <div className={classes.companyInfoCompanyPage}>
            <div className={classes.companyInfo}>
                <img
                    src={company.logo !== "" ? company.logo : defaultLogo}
                    className={classes.companyInfo__logo}
                    alt="logo"
                />
                <div className={classes.companyInfo__detail}>
                    <div className={classes.companyInfo__name__rating}>
                        <h2 style={{ color: '#1188b8' }} className={classes.companyInfo__name}>{company.name}</h2>
                        <Box component="fieldset" mb={3} borderColor="transparent" className={classes.companyInfo__rating}>
                            <Rating name="read-only" value={company.rating} precision={1} readOnly />
                        </Box>
                        <div style={{
                            fontSize: 20,
                            fontWeight: 600
                        }}>({reviews.length})</div>
                    </div>
                    <div className={classes.companyInfo__type}>
                        <WorkOutlineIcon />
                        <div>{company.type}</div>
                    </div>
                    <div className={classes.companyInfo__site}>
                        <LanguageIcon />
                        <a href={company.site} target="_blank" style={{ fontSize: 16, color: '#34a8eb' }}>
                            {company.site}
                        </a>
                    </div>
                    <div className={classes.companyInfo__location}>
                        <BusinessIcon />
                        <div>{company.address}</div>
                    </div>
                </div>
            </div>
            <div className={classes.companyAction}>
                <ModalReview company={company} reviews={reviews} setReviews={setReviews} setCompany={setCompany} reload={reload} setReload={setReload} />
            </div>
        </div>
    )
}
