import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/styles/withStyles';
import { useSnackbar } from 'notistack';
import React from 'react';

const styles = {
  icon: {
    height: 16,
    width: 16,
  },
};

function CloseSnackbar({ classes, key }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton
      aria-label="Close"
      color="inherit"
      onClick={() => {
        closeSnackbar(key);
      }}
    >
      <CloseIcon className={classes.icon} />
    </IconButton>
  );
}

const CloseSnackbarStyled = withStyles(styles)(CloseSnackbar);

const injectClose = (key) => <CloseSnackbarStyled key={key} />;

export default injectClose;
