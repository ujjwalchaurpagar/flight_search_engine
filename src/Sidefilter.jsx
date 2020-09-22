import React, { Fragment, useState, useEffect } from 'react'
import {FormControl, TextField, makeStyles, InputLabel, Select, MenuItem, Card,CardContent
    ,Typography, Slider, Drawer, List, Button, Grid} from '@material-ui/core';

const Sidefilter = () => {
    const [origin, setOrigin] = useState('');
    const [Destination, setDestination] = useState([]);
    const [DestiArray, setDestiArray] = useState([]);
    const [Flight, setFlight] = useState([]);
    const [Result, setResult] = useState([]);
    const [Largest, setLargest] = useState(0);
    const [Smallest, setSmallest] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [Marks] = useState([]);
    const [value, setValue] = useState([20, 37]);

    useEffect(() => {
        const flightData = require("./flights.json");
        setFlight(flightData);
    },[]);
    
    // css
    const drawerWidth = 300;
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          marginTop: theme.spacing(0),
        },
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
          },
          drawerPaper: {
            width: drawerWidth,
          },
          drawerContainer: {
            overflow: 'auto',
          },
        content: {
            flexGrow: 1,
            padding: theme.spacing(2),
            marginTop: theme.spacing(7),
        },
        card:{
            marginBottom:theme.spacing(3)
        },
        title:{
            fontSize:"22px",
            paddingBottom:"0px!important",
            marginBottom:theme.spacing(0)
        },
        tabText:{
            margin: theme.spacing(0)  
        },
        refineText:{
            margin: theme.spacing(0, 'auto')
        },
    }));

    //   filter js
    const filterSearch = async (e) => {
        e.preventDefault();
        try{
            setShowResults(true);
            Result.map((result) => (
                Marks.push(result.fare)
            ));
            sliderRange();
        }catch(error){
            console.error(error);
        }
    }
    const buy = (result) =>{
        alert(`You Booked ${result.flight_id} for ${result.source} to ${result.destination} journey successfully.`);
    }

    const ResultDiv = () => {
        return(
            <main className={classes.content}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textPrimary">
                            {origin} To {Destination}
                        </Typography>
                    </CardContent>
                </Card>
                {Result.map((result,index) => (
                <Card className={classes.card} key={index}>
                    <CardContent>
                        <div style={{display:"flex"}}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h5" color="textPrimary" gutterBottom>Rs.{result.fare}</Typography>
                            <Typography color="textPrimary" gutterBottom>{result.flight_id}</Typography>
                            <Typography variant="h6" color="textPrimary" gutterBottom>{result.source_code} &rarr; {result.destination_code}</Typography>
                            <Typography color="textPrimary" gutterBottom>Depart:{result.departs_at}</Typography>
                            <Typography color="textPrimary" gutterBottom>Arrive:{result.arrives_at}</Typography>  
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div style={{height:"70%", width:"200px", border:"1px solid #424242",marginBottom:"10px",float:"right"}}></div>
                            <Button variant="contained" size="large" color="primary" style={{position: "relative",top: "8rem",float: "right",left:"11.8rem"}} onClick={() => buy(result)}>Buy This Flight</Button>
                        </Grid>
                        </div>
                    </CardContent>
                </Card>
                ))}
            </main>
        )
    }

    // price range selector
    const sliderRange = () => {
        if(Marks.length > 0){
            setLargest(Math.max(...Marks));
            setSmallest(Math.min(...Marks));
        }
    }

    function valuetext(value) {
        return `Rs.${value}`;
    }

    const handleChang = (event, newValue) => {
        let seltLargeValue = newValue[1];
        let setSmallValue = newValue[0];
        setValue(newValue);
        setResult(Flight.filter( flight => flight.source === origin && flight.destination === Destination && parseInt(flight.fare) >= setSmallValue && parseInt(flight.fare) <= seltLargeValue));
    };

    // filter json
    const City = [];
    Flight.map((flight) => (
        City.push(flight.source)
    ));
    const uniqueSource = Array.from(new Set(City));

    const handleOrigin = (e) => {
        setOrigin(e.target.value);
        setDestiArray(uniqueSource.filter(x => x !== e.target.value));
        Marks.length = 0;
    }

    const handleDestination = (e) => {
        setDestination(e.target.value);
        setResult(Flight.filter( flight => flight.source === origin && flight.destination === e.target.value));
        Marks.length = 0;
    }
    const classes = useStyles();
    return (
        <Fragment>
            <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerContainer}>
                <List>
                    <div className="tab_container">
                        <p className={classes.tabText}>One way</p>
                    </div>
                    <div className="filter_container">
                    <form onSubmit={filterSearch}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="origin_city">Origin City</InputLabel>
                            <Select
                            labelId="origin_city"
                            id="origin_city"
                            value={origin}
                            onChange={handleOrigin}
                            label="Origin City"
                            style={{width:"260px"}}
                            required
                            >
                            {uniqueSource.map((City, index) => (
                            <MenuItem key={index} value={City}>{City}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="destination_city">Destination City</InputLabel>
                            <Select
                            labelId="destination_city"
                            id="destination_city"
                            value={Destination}
                            onChange={handleDestination}
                            label="Destination City"
                            style={{width:"260px"}}
                            required
                            >
                            {DestiArray.map((City, index) => (
                            <MenuItem key={index} value={City}>{City}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="Passenger">Passenger</InputLabel>
                            <Select
                                native
                                label="Passenger"
                                style={{width:"260px"}}
                            >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            </Select>
                        </FormControl>
                        <TextField
                            id="date"
                            label="Departure Date"
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /><br /><br />
                        <TextField
                            id="date"
                            label="Return Date"
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        /><br /><br />
                        <div>
                            <Button type="submit" id="search" variant="contained" color="primary" className="m-auto" onClick={filterSearch}>Submit</Button>
                        </div>
                    </form>
                    </div>
                    <div className="filter_container" style={{height:"120px"}}>
                        <Typography className={classes.refineText} gutterBottom>Refine Flight Search</Typography>
                        <Slider
                            value={value}
                            onChange={handleChang}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                            min={Smallest}
                            max={Largest}
                        />
                        <div className={classes.root}>
                        <Typography style={{position: "absolute",marginTop: "0px",left: "20px"}} value={Smallest}>{Smallest}</Typography>
                        <Typography style={{position: "absolute",marginTop: "0px",right: "25px"}} value={Largest}>{Largest}</Typography>
                        </div>
                    </div>
                </List>
                </div>
            </Drawer>
            { showResults ? <ResultDiv /> : null }
            </div>
        </Fragment>
    )
}

export default Sidefilter;
