import React, { Component } from 'react';
import { isAuthenticated } from '../../utils/AuthUtil'
import { Redirect } from 'react-router-dom';
import { Toolbar, Typography, Avatar, IconButton, Box, List, ListItem, ListItemIcon, Divider } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import ListIcon from '@material-ui/icons/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import { StyledAppBar, RightIconContainer, Container, StyledDrawer, StyledBarCodeIcon, StyledListItemText, ContentContainer } from './styles';
import { MainPageViewModel } from './MainPageViewModel';
import { observer } from 'mobx-react';
import ProductFragment from '../product/ProductFragment';
import OptionalFragment from '../optional/OptionalFragment';
import ProfileFragment from '../profile/ProfileFragment';

@observer
class MainPage extends Component {
    state = {}

    model = new MainPageViewModel()

    componentDidMount(): void {
        this.model.getEnterpriseUser()
    }

    render(): JSX.Element {
        if (isAuthenticated())
            return this.body()
        else
            return (<Redirect to='/login'></Redirect>)
    }

    private body(): JSX.Element {
        return (<Container>
            <StyledAppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer">
                        <MenuIcon />
                    </IconButton>
                    <Box ml={4} mr={2}><Avatar src={this.model.user?.enterprise?.logo_url} /></Box>
                    <Typography variant="h6">
                        {
                            this.model.user?.enterprise?.name
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
                    <List >
                        <ListItem button key={'Produtos'} selected={this.model.position === 0} onClick={() => this.model.position = 0}>
                            <ListItemIcon><StyledBarCodeIcon /></ListItemIcon>
                            <StyledListItemText primary={'Produtos'} classes={{
                                primary: 'listItemText',
                            }} />
                        </ListItem>
                        <ListItem button key={'Opcionais'} selected={this.model.position === 1} onClick={() => this.model.position = 1}>
                            <ListItemIcon><ListIcon /></ListItemIcon>
                            <StyledListItemText primary={'Opcionais'} classes={{
                                primary: 'listItemText',
                            }} />
                        </ListItem>
                        <ListItem button key={'Catálogo'} selected={this.model.position === 2} onClick={() => this.model.position = 2}>
                            <ListItemIcon><DashboardIcon /> </ListItemIcon>
                            <StyledListItemText primary={'Catálogo'} classes={{
                                primary: 'listItemText',
                            }} />
                        </ListItem>
                        <ListItem button key={'Promoções'} selected={this.model.position === 3} onClick={() => this.model.position = 3}>
                            <ListItemIcon><LocalOfferIcon /></ListItemIcon>
                            <StyledListItemText primary={'Promoções'} classes={{
                                primary: 'listItemText',
                            }} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button key={'Perfil'} selected={this.model.position === 4} onClick={() => this.model.position = 4}>
                            <ListItemIcon><PersonIcon /></ListItemIcon>
                            <StyledListItemText primary={'Perfil'} classes={{
                                primary: 'listItemText',
                            }} />
                        </ListItem>
                        <ListItem button key={'Configurações'} selected={this.model.position === 5} onClick={() => this.model.position = 5}>
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <StyledListItemText primary={'Configurações'} classes={{
                                primary: 'listItemText',
                            }} />
                        </ListItem>
                    </List>
                </div>
            </StyledDrawer>
            <ContentContainer>{
                    this.model.position === 0 ? <ProductFragment></ProductFragment>
                :   this.model.position === 1 ? <OptionalFragment></OptionalFragment>
                :   this.model.position === 4 ? <ProfileFragment></ProfileFragment>
                :   <></>
                
                }
            
            </ContentContainer>
        </Container>)
    }
}

export default MainPage;