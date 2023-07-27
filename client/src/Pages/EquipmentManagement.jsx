import React, { useState, useEffect } from 'react';



const EquipmentManagement = () => {
    const [equipment, setEquipment]= useState([]);
    const [allEquipment, setAllEquipment]= useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState(0);


    useEffect(() => {
        fetch("/api/equipments", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => setAllEquipment(data))
        .catch(error => {
            console.log(error);
        });
      }, [equipment]);

    const addEquipment = async () => {
        const response = await fetch("/api/equipments", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name, type, amount})
        });
        if (response.ok) {
            const savedEquipment = await response.json();
            setEquipment([...equipment, savedEquipment]);
            // setName("");
            // setType("");
            // setAmount(0);
        } else {
            console.error("Error adding equipment", response.status);
        }
    }
  return (
    <div>
        <h1>EquipmentManagement</h1>
        <form
        onSubmit={(e) => {
            e.preventDefault();
            addEquipment();
        }}
        >
        <label htmlFor='name'>Name:</label>
        <input
        type='text'
        id='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        />
        <br />
        <label htmlFor='type'>Type:</label>
        <input
        type='text'
        id='type'
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
        />
        <br />
        <label htmlFor='amount'>Amount:</label>
        <input
        type='number'
        id='amount'
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        required
        />
        <br />
        <button type='submit'>Add equipment</button>
        </form>
        <ul>
            {allEquipment.map((equip, index) => (
                <li key={index}>
                    <strong>Name:</strong> {equip.name}, <strong>Type</strong>{" "}
                    {equip.type}, <strong>Amount:</strong> {equip.amount}
                </li>
            ))}
        </ul>
    </div>
  );
}

export default EquipmentManagement