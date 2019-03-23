import React, { useState, useEffect } from 'react';
import RouterPropTypes from 'react-router-prop-types';
import DocumentTitle from 'react-document-title';
import Grid from '@material-ui/core/Grid';

import ShowInfo from '../components/ShowInfo';
import SearchForm from '../components/SearchForm';
import { getShowIdFromPathname, handleError } from '../utils';
import { getShowApi } from '../services/api';

const ShowInfoPage = ({ location, history }) => {
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const id = getShowIdFromPathname(location.pathname);

  const fetchShow = async () => {
    setError(null);
    setIsLoading(true);
    const res = await getShowApi(id);

    if (res.ok) {
      const data = await res.json();
      setShow(data);
    } else {
      const message = handleError(res.status);
      setError(message);
      setShow(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchShow(id);
  }, [id]);

  return (
    <DocumentTitle title={show ? show.name : 'Show'}>
      <div>
        <Grid container justify="center">
          <Grid item lg={6} md={8} sm={10} xs={11}>
            <SearchForm push={history.push} />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item lg={6} md={8} sm={10} xs={11}>
            <ShowInfo info={show} loading={isLoading} error={error} />
          </Grid>
        </Grid>
      </div>
    </DocumentTitle>
  );
};

ShowInfoPage.propTypes = {
  history: RouterPropTypes.history.isRequired,
  location: RouterPropTypes.location.isRequired,
};

export default ShowInfoPage;
