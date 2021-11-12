import React from "react";
import PropTypes from "prop-types";
import { Button, makeStyles } from "@material-ui/core";

const buttonColor = "#05C46B";
const bgVariant = (primary) => (primary ? buttonColor : "#fff");
const colorVariant = (primary) => (primary ? "#fff" : "#424242");

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: bgVariant,
    color: colorVariant,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 16,
    borderColor: (primary) => (primary ? "none" : "#aaa"),
    "& svg.MuiSvgIcon-root": {
      fontSize: 16,
    },
    "&:hover": {
      backgroundColor: bgVariant,
      filter: "brightness(110%)",
    },
  },
}));

const OverrideButton = ({ label, icon, primary = false, ...rest }) => {
  const classes = useStyles(primary);
  return (
    <Button
      {...rest}
      className={classes.button}
      variant={primary ? "contained" : "outlined"}
      startIcon={icon}
    >
      {label}
    </Button>
  );
};

OverrideButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  primary: PropTypes.bool,
};

export default OverrideButton;
