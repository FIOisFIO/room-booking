import { Box, Button, Container, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from "react";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import RoomSelector from "../room-selector/roomSelector";
import FloorSelector from "../floor-selector/floorSelector";
import TowerSelector from "../tower-selector/towerSelector";
import dayjs from "dayjs";


export function FormWrapper() {

    const [tower, setTower] = useState('');
    const [floor, setFloor] = useState('');
    const [room, setRoom] = useState('');
    const [date, setDate] = useState(dayjs());
    const [time, setTime] = useState(dayjs().set('hour', 12).startOf('hour'));
    const [comment, setComment] = useState('');
    const [error, setError] = useState({});

    const commentChange = (event) => {
        setComment(event.target.value);
    };

    function clearForm() {
        setTower('');
        setFloor('');
        setRoom('');
        setDate(dayjs());
        setTime(dayjs().set('hour', 12).startOf('hour'));
        setComment('');
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

    function createErrorTemplate() {
        let template = {}

        template.towerSelect = tower ? false : true;
        template.floorSelect = floor ? false : true;
        template.roomSelect = room ? false : true;

        setError(template)
    }

    function sendDate() {
        createErrorTemplate();

        if (tower && floor && room && date && time) {
            dateToJSON()
        } 
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container className="form-wrapper-container">

                <TowerSelector
                    tower={tower}
                    setTower={setTower}
                    error={error?.towerSelect}>
                </TowerSelector>

                <FloorSelector
                    tower={tower}
                    floor={floor}
                    setFloor={setFloor}
                    error={error?.floorSelect}
                    className="custom-input">
                </FloorSelector>

                <RoomSelector
                    tower={tower}
                    floor={floor}
                    room={room}
                    setRoom={setRoom}
                    error={error?.roomSelect}
                    className="custom-input">
                </RoomSelector>

                <DatePicker
                    label="Дата"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    disablePast
                    className="custom-input"
                />

                <TimePicker
                    label="Время"
                    value={time}
                    onChange={(newValue) => setTime(newValue)}
                    className="custom-input" />

                <TextField
                    placeholder={'комментарий'}
                    value={comment}
                    onChange={commentChange}
                    variant="outlined"
                    multiline
                    className="custom-input" />

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0px',
                    width: '200px',
                    height: '50px',
                }}>
                    <Button onClick={clearForm} color="error">Очистить</Button>
                    <Button onClick={sendDate}>Отправить</Button>
                </Box>

            </Container>
        </LocalizationProvider>
    )
}