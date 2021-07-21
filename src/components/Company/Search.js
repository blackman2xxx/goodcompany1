import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  search: {
    width: "80%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  searchBar: {
    width: "40%",
  },
  searchButton: {
    height: "fit-content",
  },
  formControl: {
    width: "10%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Search(props) {
  const classes = useStyles();
  const { search, sort } = props;
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const history = useHistory();

  function handleChange(e) {
    setSortValue(e.target.value);
    sort(e.target.value);
  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.search}>
        <TextField
          id="outlined-search"
          className={classes.searchBar}
          label="Tên công ty"
          type="search"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          variant="contained"
          className={classes.searchButton}
          color="primary"
          onClick={() => search(searchValue)}
        >
          Tìm kiếm
        </Button>
      </div>
      { history.location.pathname !== '/admin/companies' &&
        <FormControl
          variant="outlined"
          className={classes.formControl}
          size="small"
        >
          <InputLabel id="demo-simple-select-outlined-label">Đánh giá</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={sortValue}
            onChange={handleChange}
            label="Đánh giá"
          >
            <MenuItem value={"asc"}>Từ cao xuống thấp</MenuItem>
            <MenuItem value={"desc"}>Từ thấp đến cao</MenuItem>
          </Select>
        </FormControl>
      }
    </form>
  );
}

export default Search;
