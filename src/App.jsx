import React from 'react';
import Menu from './components/Menu/Menu';
import ClubList from './components/ClubList/ClubList';

const App = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Menu />
            <ClubList />
        </div>
    );
};

export default App;
