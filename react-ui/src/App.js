
import { React, useEffect, useState } from "react";
import { Grid,Card, CardMedia, Container, Button, Box, TableRow, TableCell, Typography, Table, TableHead, TableBody, TableContainer, Paper } from "@mui/material";
import video from './Media/video.mp4'
import logo from './Media/logo.png'
import axios from 'axios'
import Row from './Components/Row'
import {Link} from 'react-scroll'



function App() {

  const [tableData, setTableData] = useState([])
  const [isTableDisplayed, setIsTableDisplayed] = useState(true)


  /*Load basketball table data on page mount*/
  useEffect(() => {
    axios.get('https://www.balldontlie.io/api/v1/teams').then(response => {
      setTableData(response.data.data)
    }).catch(error=>console.log(error))
  }, [])


  return (
    <Box sx={{backgroundColor:'#F7F9F9'}}>
     
{/*Background video media*/}

      <Box position='relative'>
        <Card id="home">
          <CardMedia component='video' src={video} autoPlay muted loop sx={{ display: 'in-line', zIndex: -1 }}>

          </CardMedia>
        </Card>
   
{/*Box to position logo on video background*/}
        <Box sx={{
          
          position: 'absolute',
         
          top: {xs: 50, sm:100},
          left: '50%',
          transform: 'translateX(-50%)'

        }}>
        
        <Box sx={{width: {xs:'300px',sm:'600px',md:'900px',lg:'1300px'},opacity: 0.4 }} component="Img" src={logo}> </Box>

        </Box>
           
{/*Box to position big weather button */}
        <Box sx={{
          position: 'absolute',
          color: 'white',
          top: {xs:200, sm: 300, md:400, lg:600},
        
          left: {xs:'50%', sm:'75%'},
          transform: 'translateX(-50%)'

        }}>
         <Link  to="table" spy={true} smooth={true} offset={10} duration={1000} > 
          <Button variant="contained" >
        <Typography align="center" sx={{width: {xs:200, sm: 300},fontSize: {xs: 8, sm:30}, padding: {xs:1,sm:3}, fontWeight: 450 }}>  
          Get Teams & Weather
        </Typography>
          </Button> 
          </Link>
        </Box>


      </Box>
    
{/*Table Begins*/}
      <Box name="table" id="table" display={isTableDisplayed ? "block" : "none"} > 
      <Container  >
        <Typography sx={{id:'table',marginTop:15}}variant="h2"align="center">Select Dropdown Arrow for Weather</Typography>
          <TableContainer sx={{ paddingBottom: 5,marginTop:10}}component={Paper} >
            <Table aria-label="collapsible table">
{/*Team Table Headers*/}
              <TableHead sx={{backgroundColor:'#D3D3D3'}}>
                <TableRow>
                  <TableCell />
                  <TableCell>Team</TableCell>
                  <TableCell align="right">Abbreviation</TableCell>
                  <TableCell align="right">City</TableCell>
                  <TableCell align="right">Conference</TableCell>
                  <TableCell align="right">Division</TableCell>
                </TableRow>
              </TableHead>
{/*Table Rows*/}
              <TableBody>
                {tableData.map((row) => (
                  <Row key={row.id} abbreviation={row.abbreviation} fullName={row.full_name} division={row.division} conference={row.conference} city={row.city} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Container>
      </Box>
    
   </Box>
  
 

  )
}

export default App;
