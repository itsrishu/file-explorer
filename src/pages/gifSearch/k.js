import './d.css'
const data = [
	'Item 1',
	'Item 2',
	'Item 3',
	'Item 4',
	'Item 5',
	'Item 6',
	'Item 7',
]

export default function App() {
	return (
		<div class='grid-container'>
			{data.map((_i) => (
				<div class='grid-item'>{_i}</div>
			))}
		</div>
	)
}

import React from 'react'

// function RedirectButton() {
//   const handleButtonClick = () => {
//     window.open('/trending', '_blank');
//   };

//   return (
//     <div>
//       <h1>Welcome to My App</h1>
//       <button onClick={handleButtonClick}>Go to Trending</button>
//     </div>
//   );
// }

// export default RedirectButton;

// import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Home from './Home';
// import Trending from './Trending';

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route path="/trending" component={Trending} />
//       </Switch>
//     </Router>
//   );
// }

// export default App;
