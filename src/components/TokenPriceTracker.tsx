import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Search, Calculator, Filter } from 'lucide-react';

interface ModelData {
    id: number;
    name: string;
    slug: string;
    provider: {
        name: string;
        slug: string;
    };
    inputPrice: number;
    outputPrice: number;
    contextWindow: number;
    description?: string;
}

interface TokenPriceTrackerProps {
    initialData: ModelData[];
}

export default function TokenPriceTracker({ initialData }: TokenPriceTrackerProps) {
    const [sortConfig, setSortConfig] = useState<{ key: keyof ModelData | 'provider' | 'inputCost' | 'outputCost'; direction: 'asc' | 'desc' } | null>({ key: 'inputPrice', direction: 'asc' });
    const [filter, setFilter] = useState('');
    const [selectedProvider, setSelectedProvider] = useState<string>('all');
    const [inputTokens, setInputTokens] = useState<number>(1000000);
    const [outputTokens, setOutputTokens] = useState<number>(1000000);

    const providers = useMemo(() => {
        const unique = new Set(initialData.map(d => d.provider.name));
        return Array.from(unique).sort();
    }, [initialData]);

    const sortedData = useMemo(() => {
        let sortableItems = [...initialData];

        // Filter
        if (filter) {
            sortableItems = sortableItems.filter(item =>
                item.name.toLowerCase().includes(filter.toLowerCase()) ||
                item.provider.name.toLowerCase().includes(filter.toLowerCase())
            );
        }

        if (selectedProvider !== 'all') {
            sortableItems = sortableItems.filter(item => item.provider.name === selectedProvider);
        }

        // Sort
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                let aValue: any;
                let bValue: any;

                if (sortConfig.key === 'provider') {
                    aValue = a.provider.name;
                    bValue = b.provider.name;
                } else if (sortConfig.key === 'inputCost') {
                    aValue = (a.inputPrice * inputTokens) / 1000000;
                    bValue = (b.inputPrice * inputTokens) / 1000000;
                } else if (sortConfig.key === 'outputCost') {
                    aValue = (a.outputPrice * outputTokens) / 1000000;
                    bValue = (b.outputPrice * outputTokens) / 1000000;
                } else {
                    aValue = a[sortConfig.key as keyof ModelData];
                    bValue = b[sortConfig.key as keyof ModelData];
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [initialData, sortConfig, filter, selectedProvider, inputTokens, outputTokens]);

    const requestSort = (key: keyof ModelData | 'provider' | 'inputCost' | 'outputCost') => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const calculateCost = (pricePerMillion: number, tokens: number) => {
        return (pricePerMillion * tokens) / 1000000;
    };

    return (
        <div className="w-full space-y-6">
            {/* Calculator Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Input Tokens</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={inputTokens}
                            onChange={(e) => setInputTokens(Number(e.target.value))}
                            className="w-full pl-4 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                            tokens
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Output Tokens</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={outputTokens}
                            onChange={(e) => setOutputTokens(Number(e.target.value))}
                            className="w-full pl-4 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                            tokens
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search models (e.g. gpt-4, claude)..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                        <select
                            className="pl-9 pr-8 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                            value={selectedProvider}
                            onChange={(e) => setSelectedProvider(e.target.value)}
                        >
                            <option value="all">All Providers</option>
                            {providers.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-400 uppercase bg-white/5 border-b border-white/10">
                        <tr>
                            <th scope="col" className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('name')}>
                                <div className="flex items-center gap-1">Model <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th scope="col" className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('provider')}>
                                <div className="flex items-center gap-1">Provider <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th scope="col" className="px-6 py-4 cursor-pointer hover:text-white transition-colors text-right" onClick={() => requestSort('inputPrice')}>
                                <div className="flex items-center gap-1 justify-end">Input / 1M <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th scope="col" className="px-6 py-4 cursor-pointer hover:text-white transition-colors text-right" onClick={() => requestSort('outputPrice')}>
                                <div className="flex items-center gap-1 justify-end">Output / 1M <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th scope="col" className="px-6 py-4 cursor-pointer hover:text-white transition-colors text-right bg-blue-500/10" onClick={() => requestSort('inputCost')}>
                                <div className="flex items-center gap-1 justify-end text-blue-300">Est. Input Cost <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th scope="col" className="px-6 py-4 cursor-pointer hover:text-white transition-colors text-right bg-purple-500/10" onClick={() => requestSort('outputCost')}>
                                <div className="flex items-center gap-1 justify-end text-purple-300">Est. Output Cost <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {sortedData.map((model) => (
                            <tr key={model.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4 font-medium text-white">
                                    <div className="flex flex-col">
                                        <a href={`/ai-token-pricing/${model.provider.slug}/${model.slug}`} className="hover:text-blue-400 transition-colors">
                                            {model.name}
                                        </a>
                                        <span className="text-xs text-gray-500 mt-0.5">{model.contextWindow.toLocaleString()} ctx</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href={`/ai-token-pricing/${model.provider.slug}`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-gray-300 hover:bg-white/20 transition-colors">
                                        {model.provider.name}
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-gray-400">${model.inputPrice.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right font-mono text-gray-400">${model.outputPrice.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right font-mono font-medium text-blue-400 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors">
                                    ${calculateCost(model.inputPrice, inputTokens).toFixed(4)}
                                </td>
                                <td className="px-6 py-4 text-right font-mono font-medium text-purple-400 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors">
                                    ${calculateCost(model.outputPrice, outputTokens).toFixed(4)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-500 px-2">
                <div>
                    Showing {sortedData.length} models
                </div>
                <div>
                    Prices updated daily. Last update: {new Date().toLocaleDateString()}
                </div>
            </div>
        </div>
    );
}
