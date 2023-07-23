import "./styles.css";
import Navbar from "./components/Navbar.js";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Features from "./routes/Features";
import Graphs from "./routes/Graphs";
import Learn from "./routes/Learn";
import Footer from "./components/Footer";
import Login from "./routes/Login";
import Screen from "./routes/Screen";
import BarChart from "./components/Charts/BarChart";
import Area from "./routes/Area";
import Selected from "./routes/Selected";
import Polar from "./routes/Polar";
import LinePage from "./routes/line";
import ScatterPlot from "./routes/Scatter";
import Piechar from "./routes/Piechart";
import DoughnutGraph from "./routes/DoughnutGraph";
import RadarGraph from "./routes/RadarGraph";
import { TransferDataProvider } from './routes/context';
import StackedLine from "./routes/StackedLine";
import StackedBar from "./routes/StackedBar";
import SideBar from "./routes/SideBar";

export default function App() {

  return (
    <div>
    <div>
      <TransferDataProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/graphs" element={<Graphs />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Screen />} />
        <Route path="/graphs/barchart" element={<Selected />} />
        <Route path="/graphs/sideBar" element={<SideBar />} />
        <Route path="/graphs/linechart" element={<LinePage />} />
        <Route path="/graphs/scatterchart" element={<ScatterPlot />} />
        <Route path="/graphs/stackedlinechart" element={<StackedLine />} />
        <Route path="/graphs/stackedbarchart" element={<StackedBar />} />
        <Route path="/graphs/piechart" element={<Piechar />} />
        <Route path="/graphs/doughnutchart" element={<DoughnutGraph />} />
        <Route path="/graphs/polararea" element={<Polar />} />
        <Route path="/graphs/treechart" element={<BarChart />} />
        <Route path="/graphs/radialchart" element={<BarChart />} />
        <Route path="/graphs/areachart" element={<Area />} />
        <Route path="/graphs/bubblebarchart" element={<BarChart />} />
        <Route path="/graphs/radarchart" element={<RadarGraph />} />
      </Routes>
      <Navbar />
      <Footer/>
      </TransferDataProvider>
    </div>
    </div>
  );
}
