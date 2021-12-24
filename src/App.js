import React, {useState, useEffect} from 'react';
import './app.css';

function formatDate(date, format) {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    }

    return format.replace(/mm|dd|yyyy/gi, matched => map[matched])
}

const App = () => {
    const firstName = 'Gift - '
    const [lastName, setLastName] = useState(''); 
    const [amount, setAmount] = useState(''); 
    const [lastCampusID, setLastCampusID] = useState(1000000000);
    const [qty, setQty] = useState('');
    const [expDate, setExpDate] = useState('');

    const [entries, setEntries] = useState('');

    /* Initialize the date picker */
    useEffect(() => {
        let d = new Date();  
        setExpDate((d.getFullYear()+5).toString() + '-' + (d.getMonth() + 1).toString().padStart(2, 0) + 
        '-' + d.getDate().toString().padStart(2, 0));
    }, [])

    const handleAddEntries = (e) => {
        e.preventDefault();
        
        let records = [];
        let counter = 1; 

        let lastCampusID_X = lastCampusID;
        for (counter; counter <= qty; counter++){
            lastCampusID_X++;

            records.push({
                lastCampusID_X, 
                firstName, 
                lastName, 
                amount,
                expDate, 
                counter 
            })
        }

        // console.log(records);

        const csvHeaders = 'External_ID,CardNum,Name_First,Name_Last,Amount,Expiration,Counter\n'; 

        let rowEntry = '';  

        if (entries === ''){
            rowEntry = csvHeaders; 
        }
        
        records.forEach((record) => {
            rowEntry += `${record.lastCampusID_X},${record.lastCampusID_X}=0013,${record.firstName},${record.lastName},${record.amount},${record.expDate} 00:00:00,${record.counter}\n`
        })

        setEntries(prevState => prevState + rowEntry);
        setLastCampusID(lastCampusID_X);
        
    }

    const handleSave = () => {
        const element = document.createElement("a");
        const text = entries;
        const file = new Blob([text], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `Atrium Import File ${formatDate(new Date(), 'yyyy-mm-dd')}.csv`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    return (
        <div className="container">
            <form onSubmit={handleAddEntries}>
                <div className="title">
                    <h1>CSV Generator for Atrium</h1>
                </div>

                <div className="formRow">
                    <div className="inputGroup">
                        <label>First Name</label>
                        <input 
                            type="text" 
                            name="firstName"
                            value="Gift - "
                            disabled
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Last Name</label>
                        <input 
                            type="text" 
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Amount</label>
                        <input 
                            type="number" 
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Expiration Date</label>
                        <input 
                            type="date" 
                            name="expDate"
                            value={expDate}
                            onChange={e => setExpDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="formRow">
                    <div className="inputGroup">
                        <label>Last Campus ID (10 digits)</label>
                        <input 
                            type="text" 
                            name="lastCampusId"
                            pattern="\d{10}"
                            value={lastCampusID}
                            onChange={(e) => setLastCampusID(e.target.value)}
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Quantity</label>
                        <input 
                            type="number" 
                            name="qty"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                        />
                    </div>
                </div>

                <div className="formRow">
                    <button type="submit">Add Entries</button>
                </div>

                <div className="formRow">
                  <textarea name="output" value={entries} readOnly></textarea>
                </div>

                <div className="formRow">
                    <button onClick={handleSave}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default App
