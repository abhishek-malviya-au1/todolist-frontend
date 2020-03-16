import withStyles from "@material-ui/core/styles/withStyles";
import { SnackbarProvider } from "notistack";
import React from "react";
import injectClose from "./Dismissbutton";
import App from './App';

const styles = {
  success: {
    backgroundColor: "#fff",
    color: "#008985",
    border: "1px solid #008985",
    borderLeft: "6px solid #008985",
    fontWeight: "bold",
  },
  error: {
    backgroundColor: "#fff",
    color: "#F60038 ",
    border: "1px solid #F60038",
    borderLeft: "6px solid #F60038 ",
    fontWeight: "bold",
  },
  warning: {
    backgroundColor: "#fff",
    color: "#F86B07",
    border: "1px solid #F86B07",
    borderLeft: "6px solid #F86B07",
    fontWeight: "bold",
  },
  info: {
    backgroundColor: "#fff",
    color: "#035EC1",
    border: "1px solid #035EC1",
    borderLeft: "6px solid #035EC1",
    fontWeight: "bold",
  },
};

const SnackbarComponent = (props) => {
  const { classes } = props;

  return (
    <SnackbarProvider
      maxSnack={2}
      persist={false}
      preventDuplicate={true}
      autoHideDuration={3000}
      // autoHideDuration={null}
      disableWindowBlurListener={false}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      iconVariant={{
        success: "🌲 \xa0\xa0 ",
        error: "🌶 \xa0\xa0",
        warning: "⚠️ \xa0\xa0 ",
        info: "ℹ️ \xa0\xa0 ",
      }}
      transitionDuration={{ exit: 100, enter: 50 }}
      action={injectClose}
      classes={{
        variantSuccess: classes.success,
        variantError: classes.error,
        variantWarning: classes.warning,
        variantInfo: classes.info,
      }}
    >
     <App />
    </SnackbarProvider>
  );
};

export default withStyles(styles)(SnackbarComponent);