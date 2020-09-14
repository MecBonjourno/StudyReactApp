import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Repository from '../pages/Repository'
import Albums from '../pages/Albums'

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/albums" component={Albums} />
        <Route path="/bands/:id" component={Repository} />
    </Switch>
)

export default Routes;