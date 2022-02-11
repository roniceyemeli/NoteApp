import { AddCircleOutlined, SubjectOutlined } from '@mui/icons-material';
import { AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: "#f9f9f9",
            width: "100%",
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        active: {
            background: "#33eaf",
        },
        onHover: {
            cursor: "pointer"
        },
        title: {
            padding: theme.spacing(2)
        },
        // toolbar: theme.mixins.toolbar, or -->
        toolbar: {
            minHeight:'5em'
        },
        date: {
            flexGrow: 1
        },
        avatar:{
            marginLeft: theme.spacing(2)
        }
    }
})


const Layout = ({ children }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: "My Notes",
            icon: <SubjectOutlined color = "secondary"/>,
            path: "/"
        },
        {
            text: "Create Notes",
            icon: <AddCircleOutlined color = "secondary"/>,
            path: "/create"
        }
    ]

    return (
        <div className = {classes.root}>

            {/* App bar build */}
            <AppBar style={{width: `calc(100% - ${drawerWidth}px)`}} elevation={0}>
                <Toolbar>
                    <Typography className={classes.date} >
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography>
                        Momonoskay
                    </Typography>
                    <Avatar alt="avatar" src="/av.jpeg" className={classes.avatar} />
                </Toolbar>
            </AppBar>

            {/* side Drawer */}
            <Drawer
                className = { classes.drawer }
                variant = "permanent"
                anchor = "left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography variant = "h5" className={classes.title}>
                        Notes App
                    </Typography>
                </div>

                <List className = {classes.onHover}>
                    {
                        menuItems.map( item => (
                            <ListItem
                                key = { item.text }
                                button
                                onClick = {() => history.push(item.path)}
                                className = { location.pathname === item.path ? classes.active : null}
                            >
                                <ListItemIcon> { item.icon } </ListItemIcon>
                                <ListItemText primary = { item.text }/>
                            </ListItem>
                        ))
                    }
                </List>

            </Drawer>
            
            {/* children of Layout component */}
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}

export default Layout
