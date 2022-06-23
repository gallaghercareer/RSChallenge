import * as React from 'react';
import { useState } from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios'


function Row(props) {


    const [open, setOpen] = useState(false)
    const [temperature, setTemperature] = useState(0)
    const [humidity, setHumidity] = useState(0)
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')

/*Function grabs weather data from api */
    const getWeather = () => {

        axios.get(`http://api.weatherapi.com/v1/current.json?key=518f8f8462544081a7e132637221406&q=${props.city}&aqi=no`)
            .then(function (response) {
                setTemperature(response.data.current.temp_f)
                setHumidity(response.data.current.humidity)
                setCountry(response.data.location.country)
                setRegion(response.data.location.region)
              
            })
            .catch(function (error) {
                console.log(error);                
            })

    }
    return (
        <>
{/*Table rows for basketball team data*/}
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => {
                            setOpen(!open)
                            getWeather()
                        }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {props.fullName}
                </TableCell>
                <TableCell align="right">{props.abbreviation}</TableCell>
                <TableCell align="right">{props.city}</TableCell>
                <TableCell align="right">{props.conference}</TableCell>
                <TableCell align="right">{props.division}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Current Weather
                            </Typography>

{/*Table and headers for weather data*/}
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>City</TableCell>
                                        <TableCell>Temperature</TableCell>
                                        <TableCell align="right">Humidity</TableCell>
                                        <TableCell align="right">Country</TableCell>
                                        <TableCell align="right">Region</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

{/*Rows for weather data*/}
                                    <TableRow key={props.city}>
                                        <TableCell component="th" scope="row">
                                            {props.city}
                                        </TableCell>
                                        <TableCell>{temperature}&deg;F</TableCell>
                                        <TableCell align="right">{humidity}%</TableCell>
                                        <TableCell align="right">{country}</TableCell>
                                        <TableCell align="right">
                                            {region}
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

export default Row