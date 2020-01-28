/**
 * Dependencies
 */
import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Components
 */
import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MailIcon from "@material-ui/icons/Mail";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreIcon from "@material-ui/icons/MoreVert";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { FormattedMessage, useIntl } from "react-intl";

/**
 * Styles
 */
import { fade, makeStyles } from "@material-ui/core/styles";
import { drawerWidth } from "./navigation";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  title: {
    fontWeight: 300,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

/**
 * Component
 */
const Header = ({ onDrawerToggle }) => {
  const classes = useStyles();
  const intl = useIntl();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const unreadMessagesCount = 5;
  const unreadNotificationsCount = 12;

  const unreadMessagesAriaLabel = intl.formatMessage(
    {
      defaultMessage:
        "Show {unreadMessagesCount} unread {unreadMessagesCount, plural, one {Message} other {Messages}}",
      description: "Header Icon - Aria Label - Unread Messages"
    },
    { unreadMessagesCount }
  );

  const unreadNotificationsAriaLabel = intl.formatMessage(
    {
      defaultMessage:
        "Show {unreadNotificationsCount} unread {unreadNotificationsCount, plural, one {Notification} other {Notifications}}",
      description: "Header Icon - Aria Label - Unread Notifications"
    },
    { unreadNotificationsCount }
  );

  const userHeaderMenuButtonAriaLabel = intl.formatMessage({
    defaultMessage: "User",
    description: "Header Menu Button - Aria Label - User"
  });

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      onClose={handleMenuClose}
      open={isMenuOpen}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem onClick={handleMenuClose}>
        <FormattedMessage
          defaultMessage="Profile"
          description="Header Menu Item - Label - Profile"
        />
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <FormattedMessage
          defaultMessage="Account"
          description="Header Menu Item - Label - Account"
        />
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label={unreadMessagesAriaLabel} color="inherit">
          <Badge badgeContent={unreadMessagesCount} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>
          <FormattedMessage
            defaultMessage="{unreadMessagesCount, plural, one {Message} other {Messages}}"
            description="Header Menu Item - Label - Unread Messages"
            values={{ unreadMessagesCount }}
          />
        </p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label={unreadNotificationsAriaLabel} color="inherit">
          <Badge badgeContent={unreadNotificationsCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>
          <FormattedMessage
            defaultMessage="{unreadNotificationsCount, plural, one {Notification} other {Notifications}}"
            description="Header Menu Item - Label - Unread Notifications"
            values={{ unreadNotificationsCount }}
          />
        </p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label={userHeaderMenuButtonAriaLabel}
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>
          <FormattedMessage
            defaultMessage="User"
            description="Header Menu Button - Label - User"
          />
        </p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label={intl.formatMessage({
              defaultMessage: "Open Drawer",
              description: "Header Button - Aria Label - Open Drawer"
            })}
            onClick={onDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <FormattedMessage
              defaultMessage="Application"
              description="Header - Title"
            />
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={intl.formatMessage({
                defaultMessage: "Search",
                description: "Header Input - Placeholder - Search"
              })}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{
                "aria-label": intl.formatMessage({
                  defaultMessage: "Search",
                  description: "Header Input - Aria Label - Search"
                })
              }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label={unreadMessagesAriaLabel} color="inherit">
              <Badge badgeContent={unreadMessagesCount} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label={unreadNotificationsAriaLabel}
              color="inherit"
            >
              <Badge badgeContent={unreadNotificationsCount} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label={userHeaderMenuButtonAriaLabel}
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label={intl.formatMessage({
                defaultMessage: "Show More",
                description: "Header Menu Button - Aria Label - Show More"
              })}
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
};

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired
};

export default Header;
