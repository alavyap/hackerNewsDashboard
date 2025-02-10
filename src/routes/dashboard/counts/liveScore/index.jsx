import React, { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "@/hooks/use-theme";
import { getLiveScores } from "./apiCall";

const LiveScores = () => {
    const { theme } = useTheme();
    const [liveData, setLiveData] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            const data = await getLiveScores();
            setLiveData(data);
        };

        fetchScores();
        const interval = setInterval(fetchScores, 3600000); // Update every 1 hour

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    // Determine max value for Y-axis scaling
    const maxYValue = liveData.length > 0 ? Math.max(...liveData.map((d) => parseFloat(d.total))) : 10;

    return (
        <div className="card col-span-1 md:col-span-2 lg:col-span-4">
            <div className="card-header">
                <p className="card-title">Live Score (Last 10 Hours)</p>
            </div>
            <div className="card-body p-0">
                <ResponsiveContainer
                    width="100%"
                    height={300}
                >
                    <AreaChart
                        data={liveData}
                        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                    >
                        <defs>
                            <linearGradient
                                id="colorTotal"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#F97316"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#F97316"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <Tooltip
                            cursor={false}
                            formatter={(value) => `${value}`}
                        />

                        <XAxis
                            dataKey="name"
                            strokeWidth={1}
                            stroke={theme === "light" ? "#475569" : "#94a3b8"}
                            tickMargin={6}
                        />
                        <YAxis
                            domain={[0, Math.ceil(maxYValue * 1.2)]} // Expands max value by 20% for better fit
                            strokeWidth={1}
                            stroke={theme === "light" ? "#475569" : "#94a3b8"}
                            tickFormatter={(value) => value}
                            tickMargin={6}
                        />

                        <Area
                            type="monotone"
                            dataKey="total"
                            stroke="#F97316"
                            fillOpacity={1}
                            fill="url(#colorTotal)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LiveScores;
