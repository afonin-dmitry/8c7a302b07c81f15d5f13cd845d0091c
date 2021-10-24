import * as React from 'react';

import EditorPage from './features/editor/EditorPage';
import List from './features/editor/pages/List';

import { Switch, Route } from 'react-router-dom';

const App = () => {
    return (
        <Switch>
            <Route exact path="/">
                <List />
            </Route>
            <Route path="/audio/">
                <EditorPage />
            </Route>
        </Switch>
  );
}

export default App;
