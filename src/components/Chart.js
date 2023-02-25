import { VictoryChart, VictoryAxis, VictoryGroup, VictoryBar, VictoryLine } from "victory";

const Chart = (
    {
        allRates,
        chartType,
        isFunShown,
        isDifficultyShown,
    }) => {

    const axisStyle = {
        tickLabels: { fontSize: 5, angle: -65 }
    };

    const dependentAxisStyle = {
        tickLabels: { fontSize: 8 }
    };

    return (
        <div>
            <div className="chart">
                <VictoryChart
                    height={136}
                    padding={{ top: 15, bottom: 30, left: 20, right: 10 }}>
                    <VictoryAxis
                        style={{
                            ...axisStyle
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickValues={[0, 1, 2, 3, 4, 5]}
                        style={{
                            ...dependentAxisStyle
                        }}
                    />
                    {chartType.chartStyle === "chart-bar-style" &&
                        <VictoryGroup offset={2}>
                            {isFunShown &&
                                <VictoryBar
                                    color={"#884EA0"}
                                    data={allRates}
                                    x={Object.keys(allRates[0])[0]}
                                    y={Object.keys(allRates[0])[1]}
                                />}
                            {isDifficultyShown &&
                                <VictoryBar
                                    color={"#F4D03F"}
                                    data={allRates}
                                    x={Object.keys(allRates[0])[0]}
                                    y={Object.keys(allRates[0])[2]}
                                />}
                        </VictoryGroup>}
                    {chartType.chartStyle === "chart-line-style" &&
                        <VictoryGroup>
                            {isFunShown &&
                                <VictoryLine
                                    color={"#884EA0"}
                                    data={allRates}
                                    x={Object.keys(allRates[0])[0]}
                                    y={Object.keys(allRates[0])[1]}
                                />}
                            {isDifficultyShown &&
                                <VictoryLine
                                    color={"#F4D03F"}
                                    data={allRates}
                                    x={Object.keys(allRates[0])[0]}
                                    y={Object.keys(allRates[0])[2]}
                                />}
                        </VictoryGroup>}
                </VictoryChart>
            </div>
        </div>
    )
};

export default Chart;