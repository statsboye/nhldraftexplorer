import React, {Component, useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import Papa from 'papaparse';
import csvFile from './csvs/combined.csv'
import Popup from 'reactjs-popup';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Select from 'react-select'
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
//I did this in like a day, so if it's illegible, my bad <3
const DC = (props) => {
    const [csvData, setCSVData] = useState(null)
    const theme = props.theme
    const [x, setX] = useState("bob")
    const [xLabel, setXLabel] = useState("Bob McKenzie")
    const [y, setY] = useState("ep")
    const [yLabel, setYLabel] = useState("EliteProspects")

    const [settingsOpen, setSettingsOpen] = useState(false)
    const [selector, setSelector] = useState(null)
    const sources = [
      {value: "bob",label: "Bob McKenzie"},
{value: "craig",label: "Craig Button"},
{value: "fch",label: "FCHockey" },
{value: "ep",label: "EliteProspects" },
{value: "mckeens",label: "McKeen's"},
{value: "sn",label: "Sportsnet"},
{value: "analyst",label: "Evaluator Averages"},
{value: "nhle",label: "TDH NHle Rank"},
{value: "pmake",label: "TDH PMake Rank"},
{value: "pstar",label: "TDH PStar Rank"},
    ]
  let xPicker = <Select options={sources} defaultValue={{value: "bob",label: "Bob McKenzie"}}  onChange={(e) => {setX(e.value); setXLabel(e.label)}} classNamePrefix='axis-picker' />
  let yPicker = <Select options={sources} defaultValue={{value: "ep",label: "EliteProspects" }} onChange={(e) => {setY(e.value); setYLabel(e.label)}} classNamePrefix='axis-picker' />

  

;
    const toggleSettings = () => {
      if (settingsOpen === true) {        
        setSettingsOpen(false)
        setSelector(null)
  
      } else {
        
        setSettingsOpen(true)
        setSelector(<div className='selector'>
          {xPicker}
          {yPicker}
          
          </div>)

      }
    }

    //
    const resultsArray = []
    /* Player,ID,Team,Bob McKenzie,Craig Button,EliteProspects,FCHockey,McKeen's,Sportsnet,TDH NHle Rank,TDH PMake Rank,TDH PStar Rank*/
    const columns=[
      {field: "index",headerName: "Index", width: 200, renderCell: ({ value }) => (
          <span style={{ overflow: "visible", textOverflow: "ellipsis", textAlign: "center" }}>
            {value}
          </span>
        )},
      {field: "player",headerName: "Player", width: 200,  renderCell: ({ value }) => (
          <span style={{ overflow: "visible", textOverflow: "ellipsis", textAlign: "center" }}>
            {value}
          </span>
        ) },
      {field: "id",headerName: "ID", width: 200, hide: true},
      {field: "team",headerName: "Team", width: 200 },
      {field: "bob",headerName: "Bob McKenzie",type: "number", width: 200},
      {field: "craig",headerName: "Craig Button",type: "number", width: 200},
      {field: "fch",headerName: "FCHockey",type: "number", width: 200 },
      {field: "ep",headerName: "EliteProspects",type: "number", width: 200 },
      {field: "mckeens",headerName: "McKeen's",type: "number", width: 200},
      {field: "sn",headerName: "Sportsnet",type: "number", width: 200},
      {field: "analyst",headerName: "Evaluator Averages", type:"number" ,width:200},
      {field: "nhle",headerName: "TDH NHle Rank",type: "number", width: 200},
      {field: "pmake",headerName: "TDH PMake Rank",type: "number", width: 200},
      {field: "pstar",headerName: "TDH PStar Rank",type: "number", width: 200},
    ]
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(csvFile);
                const reader = response.body.getReader();
                const result = await reader.read();
                  const decoder = new TextDecoder('utf-8');
                  const csv = await decoder.decode(result.value);
                  setCSVData(csv)
            } catch (error) {
                console.log("error", error);
            }
        };
  
        fetchData();
    }, []);
let table;


    if (csvData != null){
      let parsed = Papa.parse(csvData).data
      parsed.map((data, index) => (
          resultsArray.push({
            index:index,
            player:data[0],
            id:data[1],
            team:data[2],
            bob:data[3],
            craig:data[4],
            ep:data[5],
            fch:data[6],
            mckeens:data[7],
            sn:data[8],
            analyst:data[9],
            nhle:data[10],
            pmake:data[11],
            pstar:data[12]
          })
        ))
        table = <div className='player-table'><DataGrid
        rows={resultsArray}
        columns={columns}
        autoHeight={true}
        autoWidth={true}
        pageSize={50}
        density="compact"
        
        rowsPerPageOptions={[5]}
        components={{ Toolbar: GridToolbar   }}
        checkboxSelection   
        options={{
          exportButton: true,
          exportAllData: true
          }} 
        /></div>
       
      }
    //
    const temp = []
let dataMax = 0
for (let index = 0; index < resultsArray.length; index++) {
  const xValue = resultsArray[index][x];
  const yValue = resultsArray[index][y];
  /* Handle if Human */
  let humanX;
  let humanY;
  if(x === "bob" || x === "craig" || x === "fch" || x === "ep" || x === "mckeens" || x === "sn" || x === "analyst"){
    humanX = true;
  }else{
    humanX = false
  }
  if(y === "bob" || y === "craig" || y === "fch" || y === "ep" || y === "mckeens" || y === "sn" || y === "analyst"){
    humanY = true;
  }else{
    humanY = false
  }
  if((typeof(yValue) != "undefined") && (typeof(xValue) != "undefined")){
    let skip = false;
    if((humanY === true) && (yValue >= 33)){
      skip = true
    }
    if((humanX === true) && (xValue >= 33)){
      skip = true
    }
    if(skip === false){
      if((humanY) === true){
        dataMax = 32
      }else{
        dataMax = dataMax + 1
      }
    temp.push( { x: xValue, y: yValue, label: resultsArray[index]["player"]})
    }
    
  }
  
}
let data = temp
const CustomTooltip = ({ active, payload }) => {
  if(active){
    let xVal = payload[0].payload.x
    let yVal = payload[0].payload.y
    let label = payload[0].payload.label
    return <div className={'tooltip ' + theme}>
      <div>{ label }</div>
      <div className='values-tooltip'>
        <div className='values-tooltip-value'>
          <div className='value-header'>{x}</div>
          <div className='res'>{xVal}</div>
        </div>
        <div className='values-tooltip-value'>
          <div className='value-header'>{y}</div>
          <div className='res'>{yVal}</div>
        </div>
      </div>
      
      </div>
  }else{
    return null
  }
}
    


      let graph =  
      <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        width={"100%"}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid  stroke={theme === "dark" ? "#d3d2bc" : "#000"} />
        <XAxis type="number" reversed={true} dataKey="x" name={x} stroke={theme === "dark" ? "#d3d2bc" : "#000"} domain={[0, dataMax]}>
        <Label   position='bottom'   fill={theme === "dark" ? "#d3d2bc" : "#000"} style={{ textAnchor: 'middle', marginTop: "1em", fill: theme === "dark" ? "#d3d2bc" : "#000" }}>
        {xLabel}
    </Label>
          </XAxis>
        <YAxis type="number" reversed={true} dataKey="y" name={y} stroke={theme === "dark" ? "#d3d2bc" : "#000"} domain={[0, dataMax]}>
        <Label angle={270} position='left' fill={theme === "dark" ? "#d3d2bc" : "#000"}  style={{ textAnchor: 'middle', fill: theme === "dark" ? "#d3d2bc" : "#000"}}>
        {yLabel}
    </Label>
          </YAxis>
        <Tooltip  content={<CustomTooltip/>} cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="NHL Prospects by Value" data={data} fill={theme === "dark" ? "#d3d2bc" : "#000"} />
      </ScatterChart>
    </ResponsiveContainer>
;
let notes = (close => (<div className='charities'>
<Button variant="outlined" onClick={close}>Close</Button>
          <div className='charity-row'>
            <div className='charity-item'>
              <Button href="https://abortionfunds.org/donate/" variant="outlined">National Network of Abortion Funds</Button>
            </div>
            <div className='charity-item'>
              <Button href="https://www.feedingamerica.org/" variant="outlined">Feeding America</Button>
            </div>
            <div className='charity-item'>
              <Button href="https://www.thetrevorproject.org/" variant="outlined">The Trevor Project</Button>
            </div>
          </div>
          <div className='charity-row'>
          <div className='charity-item'>
              <Button href="https://www.doctorswithoutborders.org/" variant="outlined">Doctors Without Borders</Button>
            </div>
            <div className='charity-item'>
              <Button href="https://www.youcanplayproject.org/" variant="outlined">You Can Play Project</Button>
            </div>
            <div className='charity-item'>
              <Button href="https://www.irsss.ca/" variant="outlined">Indian Residential School Surivors Society</Button>
            </div>
          </div>
          <div className='thanks'>
            Thanks for visiting, donate if you can. 
            <br />
            Also, lmao I made this site in like less than a day, so if it sucks... <a href="https://www.youtube.com/watch?v=ZlviajJlctQ">Tomorrow I'll be Perfect</a> - SB
            <br />
            Data:  <a href="https://www.eliteprospects.com/">EliteProspects</a>, <a href="https://twitter.com/TopDownHockey">TopDownHockey</a>, <a href="https://tsn.ca">TSN</a>, <a href="https://sportsnet.ca">Sportsnet</a>, <a href="https://nhlentrydraft.com/">FCHockey</a>,  <a href="https://www.mckeenshockey.com/">McKeen's Hockey</a>
            <br />
            I am unaffiliated with any of these individuals or organizations, just a hockey fan. 
          </div>
        </div>));
let about = <div className='about'><Popup trigger={theme === "dark" ? 
<InfoIcon style={{ color: "#FFF", fontSize: "1.5em" }} /> : 
<InfoIcon style={{ color: "#000", fontSize: "1.5em" }} />} modal>
{notes}
</Popup></div>;


    return (
        <div className='viz'>
          <div className='graph'>   
          {graph} 
          <div className='settings' aria-label='settings' onClick={toggleSettings}>
            {theme === "dark" ? <SettingsIcon style={{ color: "#FFF", fontSize: "3em" }} /> : <SettingsIcon style={{ color: "#000", fontSize: "3em" }} />}</div>
          {selector}
    </div>
        {table}
        {about}
</div>
        
        );
}

export default DC;
