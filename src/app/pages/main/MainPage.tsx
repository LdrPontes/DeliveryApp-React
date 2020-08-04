import React, { Component } from 'react';
import { isAuthenticated } from '../../utils/AuthUtil'
import { Redirect } from 'react-router-dom';
import { Toolbar, Typography, Avatar, IconButton, Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { StyledAppBar, RightIconContainer, Container, StyledDrawer } from './styles';
class MainPage extends Component {
    state = {}

    render() {
        console.log(isAuthenticated())
        if (isAuthenticated())
            return this.body()
        else
            return (<Redirect to='/login'></Redirect>)
    }
    //TODO ALTERAR PARA VIEWMODEL
    private body(): JSX.Element {
        return (<Container>
            <StyledAppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer">
                        <MenuIcon />
                    </IconButton>
                    <Box ml={4} mr={2}><Avatar src={JSON.parse(localStorage.getItem('enterprise_user')!).enterprise.logo_url}/></Box>
                    <Typography variant="h6">
                        {
                            JSON.parse(localStorage.getItem('enterprise_user')!).enterprise.name
                        }
                    </Typography>
                    <RightIconContainer>
                        <IconButton
                            edge="end"
                            color="inherit">
                            <ExitToApp />
                        </IconButton>
                    </RightIconContainer>

                </Toolbar>
            </StyledAppBar>
            <StyledDrawer variant="permanent" classes={{
                paper: 'drawerPaper',
            }} PaperProps={{ elevation: 5 }}>
                <Toolbar />
                <div>
                    <List>
                        {['Produtos', 'Opcionais', 'Catálogo', 'Promoções'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <ExitToApp /> : <MenuIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['Perfil', 'Configurações'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <ExitToApp /> : <MenuIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </StyledDrawer>
        </Container>)
    }
}

export default MainPage;