import React, { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Slider } from 'primereact/slider';
import { Panel } from 'primereact/panel';

const WidthControlForm = () => {
    const [width, setWidth] = useState(5);

    return (
        <Panel header="Line Width Control" className="p-m-3">
            <div className="p-fluid">
                <div className="p-field p-grid">
                    <label htmlFor="lineWidth" className="p-col-12 p-md-2">
                        Line Width
                    </label>
                    <div className="p-col-12 p-md-4">
                        <InputNumber 
                            id="lineWidth"
                            value={width}
                            mode="decimal"
                            showButtons
                            min={1}
                            max={50}
                            step={1}
                        />
                    </div>
                    <div className="p-col-12 p-md-6">
                        <Slider
                            value={width}
                            min={1}
                            max={50}
                            step={1}
                            style={{ marginTop: '0.5rem' }}
                        />
                    </div>
                </div>
            </div>
        </Panel>
    );
};

export default WidthControlForm;