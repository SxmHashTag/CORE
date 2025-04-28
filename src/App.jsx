import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import CaseList from './pages/case/case_list';
import CaseDetail from './pages/case/case_detail';
import CreateCase from './pages/case/create_case';
import ItemList from './pages/items/items_list';
import ItemDetail from './pages/items/item_detail';
import CreateItem from './pages/items/create_item';
import UpdateCase from './pages/case/update_case';
import UpdateItem from './pages/items/update_item';
import Home from './components/home';
import ReportList from './pages/reports/report_list';
import CreateReport from './pages/reports/create_report';
import Stats from './pages/statistics/stats';



function App() {
  return (
    <>
      <Navbar 
          content= {
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cases/" element={<CaseList />} />
              <Route path="/create-case/" element={<CreateCase />} />
              <Route path="/cases/:id" element={<CaseDetail/>} />
              <Route path="/edit-case/:id/" element={<UpdateCase />} />
              <Route path="/items/" element={<ItemList />} />
              
              <Route path="cases/:id/create-item/" element={<CreateItem />} />
              <Route path="/items/:id" element={<ItemDetail />} />
              <Route path="/cases/:id/edit-item/:id" element={<UpdateItem />} />
              <Route path="/edit-items/:id/" element={<UpdateItem />} />
              <Route path="/reports/" element={<ReportList />} />
              <Route path="/create-report/" element={<CreateReport />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          }/>
    </>


  );
}

export default App;

