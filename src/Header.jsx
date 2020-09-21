import React, { Fragment } from 'react'
import {AppBar, Toolbar, Typography, makeStyles} from '@material-ui/core';

const Header = () => {
    const headerStyle = makeStyles((theme) => ({
        title: {
          flexGrow: 1,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
    }));

    return (
        <Fragment>
            <AppBar color="primary" position="fixed" className={headerStyle.appBar} style={{boxShadow:"none",border:"1px solid #bbbbbb"}}>
                <Toolbar>
                    <Typography variant="h6" className={headerStyle.title} noWrap>
                        Flight Search Engine
                    </Typography>
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}
export default Header;