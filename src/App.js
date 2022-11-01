import './App.css';
import { Suspense, lazy } from 'react';
//lazy loading with suspense
const Chart = lazy(() => import('./components/Chart'));

function App() {
    return (
        <div className='App'>
            <Suspense fallback={'Loading'}>
                <Chart />
            </Suspense>
        </div>
    );
}

export default App;
