import React, { useState, useEffect } from 'react';
import { Check, X, TrendingDown, TrendingUp } from 'lucide-react';

interface ModelData {
    id: number;
    name: string;
    provider: { name: string };
    inputPrice: number;
    outputPrice: number;
    contextWindow: number;
}

interface ModelComparisonProps {
    modelA: ModelData;
    modelB: ModelData;
}

export default function ModelComparison({ modelA, modelB }: ModelComparisonProps) {
    const [inputTokens, setInputTokens] = useState(1000000); // 1M default
    const [outputTokens, setOutputTokens] = useState(200000); // 200k default

    const costA = (inputTokens / 1000000 * modelA.inputPrice) + (outputTokens / 1000000 * modelA.outputPrice);
    const costB = (inputTokens / 1000000 * modelB.inputPrice) + (outputTokens / 1000000 * modelB.outputPrice);

    const diff = costA - costB;
    const percentDiff = Math.abs(diff) / Math.max(costA, costB) * 100;
    const cheaperModel = costA < costB ? modelA : modelB;
    const expensiveModel = costA < costB ? modelB : modelA;

    return (
        <div className="space-y-8">
            {/* Interactive Calculator */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Cost Simulator</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Input Tokens (Monthly)</label>
                        <input
                            type="number"
                            value={inputTokens}
                            onChange={(e) => setInputTokens(Number(e.target.value))}
                            className="w-full bg-black/20 border border-white/10 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Output Tokens (Monthly)</label>
                        <input
                            type="number"
                            value={outputTokens}
                            onChange={(e) => setOutputTokens(Number(e.target.value))}
                            className="w-full bg-black/20 border border-white/10 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div className="bg-black/20 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <div className="text-sm text-gray-400">{modelA.name} Cost</div>
                        <div className="text-2xl font-bold text-white">${costA.toFixed(2)}</div>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="text-sm text-gray-400">{modelB.name} Cost</div>
                        <div className="text-2xl font-bold text-white">${costB.toFixed(2)}</div>
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                        <TrendingDown className="w-4 h-4" />
                        {cheaperModel.name} is {percentDiff.toFixed(0)}% cheaper
                    </div>
                </div>
            </div>

            {/* Side by Side Table */}
            <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-400 uppercase bg-white/5">
                        <tr>
                            <th className="px-6 py-4">Feature</th>
                            <th className="px-6 py-4 text-white text-base">{modelA.name}</th>
                            <th className="px-6 py-4 text-white text-base">{modelB.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-white/5">
                            <td className="px-6 py-4 font-medium">Provider</td>
                            <td className="px-6 py-4">{modelA.provider.name}</td>
                            <td className="px-6 py-4">{modelB.provider.name}</td>
                        </tr>
                        <tr className="border-b border-white/5">
                            <td className="px-6 py-4 font-medium">Input Price (1M)</td>
                            <td className={`px-6 py-4 font-bold ${modelA.inputPrice < modelB.inputPrice ? 'text-emerald-400' : ''}`}>
                                ${modelA.inputPrice.toFixed(2)}
                            </td>
                            <td className={`px-6 py-4 font-bold ${modelB.inputPrice < modelA.inputPrice ? 'text-emerald-400' : ''}`}>
                                ${modelB.inputPrice.toFixed(2)}
                            </td>
                        </tr>
                        <tr className="border-b border-white/5">
                            <td className="px-6 py-4 font-medium">Output Price (1M)</td>
                            <td className={`px-6 py-4 font-bold ${modelA.outputPrice < modelB.outputPrice ? 'text-emerald-400' : ''}`}>
                                ${modelA.outputPrice.toFixed(2)}
                            </td>
                            <td className={`px-6 py-4 font-bold ${modelB.outputPrice < modelA.outputPrice ? 'text-emerald-400' : ''}`}>
                                ${modelB.outputPrice.toFixed(2)}
                            </td>
                        </tr>
                        <tr className="border-b border-white/5">
                            <td className="px-6 py-4 font-medium">Context Window</td>
                            <td className={`px-6 py-4 ${modelA.contextWindow > modelB.contextWindow ? 'text-emerald-400' : ''}`}>
                                {modelA.contextWindow.toLocaleString()}
                            </td>
                            <td className={`px-6 py-4 ${modelB.contextWindow > modelA.contextWindow ? 'text-emerald-400' : ''}`}>
                                {modelB.contextWindow.toLocaleString()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
