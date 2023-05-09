import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from "react";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import RoomSelector from "../room-selector/roomSelector";


export function FormWrapper({ towers, floors }) {

    const [tower, setTower] = useState('');
    const [floor, setFloor] = useState('');
    const [room, setRoom] = useState('');
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [comment, setComment] = useState('');

    const towerChange = (event) => {
        setTower(event.target.value);
    };
    const floorChange = (event) => {
        setFloor(event.target.value);
    };
    const commentChange = (event) => {
        setComment(event.target.value);
    };
    function clearForm() {
        setTower('')
        setFloor('')
        setRoom('')
        setDate(null)
        setTime(null)
        setComment('')
    }
    function dateToJSON() {
        console.log(JSON.stringify({
            towerId: tower, 
            floorId: floor, 
            roomId: room, 
            date: date?.$d, 
            time: time?.$d, 
            comment: comment
        }))
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container className="form-wrapper-container">
                <FormControl className="custom-input">
                    <InputLabel id='tower-select-label'>Башня</InputLabel>
                    <Select
                        id='tower-select'
                        labelId="tower-select-label"
                        value={tower}
                        label='Башня'
                        onChange={towerChange}
                    >
                        {towers.map((menuItem) => {
                            return <MenuItem key={menuItem.id} value={menuItem.id}>{menuItem.name}</MenuItem>
                        })}

                    </Select>
                </FormControl>

                <FormControl className="custom-input">
                    <InputLabel id='floor-select-label'>Этаж</InputLabel>
                    <Select
                        id='floor-select'
                        labelId="floor-select-label"
                        value={floor}
                        label='Этаж'
                        onChange={floorChange}
                    >
                        {floors.map((menuItem) => {
                            return <MenuItem key={menuItem.id} value={menuItem.id}>{menuItem.name}</MenuItem>
                        })}

                    </Select>
                </FormControl>

                <RoomSelector tower={tower} floor={floor} room={room} setRoom={setRoom} className="custom-input">
                </RoomSelector>


                <DatePicker
                    label="Дата"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    className="custom-input"

                />

                <TimePicker label="Время" value={time} onChange={(newValue) => setTime(newValue)} className="custom-input"/>
                <div>
                    <TextField placeholder={'комментарий'} value={comment} onChange={commentChange} variant="outlined" multiline className="custom-input" />
                </div>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0px',
                    width: '200px',
                    height: '50px',
                }}>
                    <Button onClick={clearForm}>Очистить</Button>
                    <Button onClick={dateToJSON}>Отправить</Button>
                </Box>


            </Container>
        </LocalizationProvider>
    )
}