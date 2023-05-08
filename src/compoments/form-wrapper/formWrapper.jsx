import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
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
            <Container sx={{
                display: 'flex',
                width: '30vw',
                flexDirection: 'column',
                margin: 'auto',
                padding: '10px',
                height: '450px',
                justifyContent: 'space-between'
            }}>
                <FormControl>
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

                <FormControl>
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

                <RoomSelector tower={tower} floor={floor} room={room} setRoom={setRoom}></RoomSelector>


                <DatePicker
                    label="Дата"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}

                />

                <TimePicker label="Время" value={time} onChange={(newValue) => setTime(newValue)} />

                <TextField placeholder={'комментарий'} value={comment} onChange={commentChange} variant="standard" />

                <Container>
                    <Button onClick={clearForm}>Очистить</Button>
                    <Button onClick={dateToJSON}>Отправить</Button>
                </Container>


            </Container>
        </LocalizationProvider>
    )
}