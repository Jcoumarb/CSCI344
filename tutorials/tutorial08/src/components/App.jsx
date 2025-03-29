import React from "react";
import NavBar from "./NavBar";
import { ColorPicker, TimePicker, Switch} from 'antd'
// custom components:
export default function App() {
    return (
        <>
            <NavBar />

            <main className="min-h-screen max-w-[1000px] mt-24 mx-auto">
                <ColorPicker defaultValue="#1677ff" />
                <TimePicker />
                <Switch />
            </main>

            <footer className="p-5 bg-white">footer goes here</footer>
        </>
    );
}
