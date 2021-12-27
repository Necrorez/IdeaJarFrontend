import * as React from 'react';
import { Button, Menu, MenuItem, Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(localStorage);
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {(localStorage.getItem('refresh_token') === null) &&
        <>
        <MenuItem>
          <Link
            component={NavLink}
            to="/register"
            underline="none"
            color="textPrimary"
          >
            Sign-up
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            component={NavLink}
            to="/login"
            underline="none"
            color="textPrimary"
          >
            Sign-in
          </Link>
        </MenuItem>
        </>
        }

        {(localStorage.getItem('refresh_token') != null) &&
          <>
          {(localStorage.getItem('is_staff')=="true") &&
          <MenuItem>
            <Link
              href="#"
              color="primary"
              variant="outlined"
              component={NavLink}
              to="/admin/category"
            >
              Categories
            </Link>
          </MenuItem>
          }
          <MenuItem>
            <Link
              href="#"
              color="primary"
              variant="outlined"
              component={NavLink}
              to="/messages"
            >
              Messages
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="#"
              color="primary"
              variant="outlined"
              component={NavLink}
              to="/logout"
            >
              Logout
            </Link>
          </MenuItem>
          </>

        }
      </Menu>
    </div>
  );
}

export default BasicMenu;