import * as React from 'react'; 

const ColorInfo = () => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-2">
                        <p><strong>Hexadecimal</strong> </p>
                    </div>
                    <div className="col-md-4">
                        <p>(e.g. <code>#fd6400</code>)</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <p><strong>RGBA</strong> </p>
                    </div>
                    <div className="col-md-4">
                        <p>(e.g. <code>rgba(21, 0, 255, 0.57)</code>)</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <p><strong>HSLA</strong> </p>
                        
                    </div>
                    <div className="col-md-4">
                        <p>(e.g. <code>hsla(245, 100%, 50%, 0.57)</code>)</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <p><strong>RGB</strong> </p>
                        
                    </div>
                    <div className="col-md-4">
                        <p>(e.g. <code>rgb(21, 0, 255)</code>)</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <p><strong>HSL</strong> </p>
                    </div>
                    <div className="col-md-4">
                        <p>(e.g. <code>hsl(245, 100%, 50%)</code>)</p>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default ColorInfo;