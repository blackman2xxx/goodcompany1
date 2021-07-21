import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {Toolbar, Button, Typography} from "@material-ui/core";
import useCoStorage from "../../hooks/coStorage";
import ModalRequestNewCompany from "./ModalRequestNewCompany";
import { useAuth } from "../../contexts/AuthContext";
import defaultLogo from '../../images/sample-logo.png';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    fontWeight: 600,
    textShadow: "3px 0px 2px gray",
    fontSize: 40
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const {currentUser} = useAuth();
  const classes = useStyles();
  const { sections, title } = props;
  const [companies, addCompany, updateCompany, removeCompany] = useCoStorage();

  const company = {
    name: "",
    address: "",
    site: "",
    type: "その他",
    rating: 0,
    totalReview: 0,
    logo: defaultLogo,
    is_active: 0,
  };

  const handleAdd = (item) => {
    addCompany(item);
  };
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small"></Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          GoodCompany
        </Typography>
        <ModalRequestNewCompany
          company={company}
          title="New"
          onAddSubmit={handleAdd}
        />
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
