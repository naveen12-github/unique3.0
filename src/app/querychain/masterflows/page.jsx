'use client'
import React, { useState, useEffect } from 'react'

const Masterflow = () => {
  // Mock data - replace with actual API calls
  const workflows = [
    { id: 1, name: 'Data Validation', type: 'wf', required_headers: ['name', 'email', 'phone'] },
    { id: 2, name: 'Data Cleaning', type: 'wmf', required_headers: ['name', 'email', 'address'] },
    { id: 3, name: 'Data Transformation', type: 'mf', required_headers: ['id', 'name', 'value'] },
    { id: 4, name: 'Data Export', type: 'wmf', required_headers: ['id', 'name', 'status'] }
  ]
  
  const processDef = [
    { process_id: 1, name: 'Customer Data Process', mode: 'flow', input_source: 'csv', output_target: 'csv', flows: ['Data Validation', 'Data Cleaning'] },
    { process_id: 2, name: 'Product Data Process', mode: 'workflow', input_source: 'db', output_target: 'excel', flows: ['Data Transformation'] }
  ]
  
  const allowedDatabases = ['production_db', 'staging_db', 'test_db']

  // State management
  const [activeTab, setActiveTab] = useState('workflow')
  const [mode, setMode] = useState('flow')
  const [selectedProcess, setSelectedProcess] = useState('custom')
  const [processName, setProcessName] = useState('')
  const [inputSource, setInputSource] = useState('csv')
  const [outputTarget, setOutputTarget] = useState('csv')
  const [selectedWorkflows, setSelectedWorkflows] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [inputDatabase, setInputDatabase] = useState('')
  const [inputTable, setInputTable] = useState('')
  const [outputDatabase, setOutputDatabase] = useState('')
  const [outputTable, setOutputTable] = useState('')
  const [addToPredefined, setAddToPredefined] = useState(false)

  // Filter workflows based on mode
  const getFilteredWorkflows = () => {
    const allowedTypes = mode === 'workflow' ? ['wf', 'wmf'] : ['mf', 'wmf']
    return workflows.filter(w => allowedTypes.includes(w.type))
  }

  // Get selected headers
  const getSelectedHeaders = () => {
    let headers = []
    
    if (mode === 'workflow') {
      if (selectedWorkflows.length === 1) {
        const workflow = workflows.find(w => w.name === selectedWorkflows[0])
        headers = workflow?.required_headers || []
      }
    } else {
      selectedWorkflows.forEach(workflowName => {
        const workflow = workflows.find(w => w.name === workflowName)
        if (workflow && ['mf', 'wmf'].includes(workflow.type)) {
          headers = [...new Set([...headers, ...(workflow.required_headers || [])])]
        }
      })
    }
    
    return headers
  }

  // Copy headers to clipboard
  const copyHeaders = () => {
    const headers = getSelectedHeaders()
    if (headers.length) {
      const textToCopy = headers.join(',')
      navigator.clipboard.writeText(textToCopy)
        .then(() => alert('Headers copied to clipboard!'))
        .catch(() => alert('Failed to copy headers'))
    } else {
      alert('No headers available for selected workflows')
    }
  }

  // Download headers as CSV
  const downloadHeaders = () => {
    const headers = getSelectedHeaders()
    if (headers.length) {
      const csvContent = headers.join(',') + '\n'
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'workflow_headers.csv'
      link.click()
      URL.revokeObjectURL(link.href)
    } else {
      alert('No headers available for selected workflows')
    }
  }

  // Handle workflow selection
  const handleWorkflowChange = (workflowName, checked) => {
    if (mode === 'workflow') {
      // Only allow one selection in workflow mode
      setSelectedWorkflows(checked ? [workflowName] : [])
    } else {
      // Allow multiple selections in flow mode
      if (checked) {
        setSelectedWorkflows([...selectedWorkflows, workflowName])
      } else {
        setSelectedWorkflows(selectedWorkflows.filter(w => w !== workflowName))
      }
    }
  }

  // Handle select all
  const handleSelectAll = (checked) => {
    setSelectAll(checked)
    if (checked) {
      const masterFlows = getFilteredWorkflows().filter(w => ['mf', 'wmf'].includes(w.type))
      setSelectedWorkflows(masterFlows.map(w => w.name))
    } else {
      setSelectedWorkflows([])
    }
  }

  // Populate form with process
  const populateFormWithProcess = (processId) => {
    if (processId === 'custom') {
      setProcessName('')
      setMode('flow')
      setInputSource('csv')
      setOutputTarget('csv')
      setSelectedWorkflows([])
      setAddToPredefined(false)
      return
    }

    const process = processDef.find(p => p.process_id == processId)
    if (process) {
      setProcessName(process.name)
      setMode(process.mode)
      setInputSource(process.input_source)
      setOutputTarget(process.output_target)
      setSelectedWorkflows(process.flows || [])
      setAddToPredefined(false)
    }
  }

  // Handle process selection
  useEffect(() => {
    populateFormWithProcess(selectedProcess)
  }, [selectedProcess])

  // Update select all state
  useEffect(() => {
    const masterFlows = getFilteredWorkflows().filter(w => ['mf', 'wmf'].includes(w.type))
    const selectedMasterFlows = selectedWorkflows.filter(name => {
      const workflow = workflows.find(w => w.name === name)
      return workflow && ['mf', 'wmf'].includes(workflow.type)
    })
    setSelectAll(masterFlows.length > 0 && selectedMasterFlows.length === masterFlows.length)
  }, [selectedWorkflows, mode])

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-4">
        {/* Breadcrumb */}
        <div className="w-full">
          <nav aria-label="breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li className="flex items-center">
                <a href="javascript:void(0);" className="text-blue-600 hover:text-blue-800">Query Chain</a>
              </li>
              <li className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-bold text-gray-900">Master Flow</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Previous Results Button */}
        <div className="w-full flex justify-end">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
            <i className="bi bi-clock-history mr-1"></i>Previous Results
          </button>
        </div>

        {/* Main Form */}
        <div className="w-full">
          <form className="bg-white rounded-lg shadow-md">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <h5 className="mb-0 font-semibold">
                <i className="fa fa-arrow-progress mr-2"></i>Start a New Process
              </h5>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  {/* Execution Mode */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Execution Mode</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="mode"
                          id="mode-flow"
                          value="flow"
                          checked={mode === 'flow'}
                          onChange={(e) => setMode(e.target.value)}
                          className="mr-2"
                        />
                        <label htmlFor="mode-flow" className="text-sm">
                          <span className="font-medium">Master Process</span> - Multiple workflows in sequence
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="mode"
                          id="mode-workflow"
                          value="workflow"
                          checked={mode === 'workflow'}
                          onChange={(e) => setMode(e.target.value)}
                          className="mr-2"
                        />
                        <label htmlFor="mode-workflow" className="text-sm">
                          <span className="font-medium">Workflows</span> - Runs only one workflow
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Process Section */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Process Name</label>
                    <div className="flex">
                      <select
                        className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm"
                        value={selectedProcess}
                        onChange={(e) => setSelectedProcess(e.target.value)}
                      >
                        <option value="custom">Custom</option>
                        {processDef.map(process => (
                          <option key={process.process_id} value={process.process_id}>
                            {process.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 border-l-0 rounded-r-md px-3 py-2 text-sm"
                        placeholder="Enter new process name"
                        value={processName}
                        onChange={(e) => setProcessName(e.target.value)}
                        required
                      />
                    </div>
                    {mode === 'flow' && (
                      <div className="mt-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={addToPredefined}
                            onChange={(e) => setAddToPredefined(e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm">Add to Process</span>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Workflow Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Select Workflows</label>
                    <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
                      {mode === 'flow' && (
                        <div className="flex justify-between items-center border-b pb-2 mb-2">
                          <h6 className="text-sm font-semibold text-gray-900">Choose Your Spell🪄</h6>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectAll}
                              onChange={(e) => handleSelectAll(e.target.checked)}
                              className="mr-2"
                            />
                            <span className="text-sm font-medium">Select All</span>
                          </label>
                        </div>
                      )}
                      
                      {getFilteredWorkflows().length === 0 ? (
                        <div className="text-gray-500 text-sm p-2">No workflows available for this mode</div>
                      ) : (
                        getFilteredWorkflows().map(workflow => (
                          <div key={workflow.id} className="flex items-center mt-2">
                            <input
                              type="checkbox"
                              id={`workflow_${workflow.id}`}
                              checked={selectedWorkflows.includes(workflow.name)}
                              onChange={(e) => handleWorkflowChange(workflow.name, e.target.checked)}
                              className="mr-2"
                            />
                            <label htmlFor={`workflow_${workflow.id}`} className="text-sm">
                              {workflow.name} <span className="text-blue-600 font-medium">({workflow.type.toUpperCase()})</span>
                            </label>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  {/* Input Source */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Input Source</label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="mb-4">
                        <select
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                          value={inputSource}
                          onChange={(e) => setInputSource(e.target.value)}
                        >
                          <option value="csv">CSV Upload</option>
                          <option value="db">Database</option>
                        </select>
                      </div>

                      {/* CSV Upload Section */}
                      {inputSource === 'csv' && (
                        <div className="bg-white rounded p-3">
                          <div className="mb-3">
                            <label className="block text-sm text-gray-700 mb-1">Upload CSV File</label>
                            <input
                              type="file"
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                              accept=".csv"
                            />
                          </div>
                          {selectedWorkflows.length > 0 && (
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={copyHeaders}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                              >
                                Copy Headers
                              </button>
                              <button
                                type="button"
                                onClick={downloadHeaders}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                              >
                                Download CSV
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Database Input Section */}
                      {inputSource === 'db' && (
                        <div className="mt-3">
                          <label className="block text-sm font-bold text-gray-700 mb-2">Database Source</label>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <div>
                              <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                value={inputDatabase}
                                onChange={(e) => setInputDatabase(e.target.value)}
                              >
                                <option value="">Select Database</option>
                                {allowedDatabases.map(db => (
                                  <option key={db} value={db}>{db}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                value={inputTable}
                                onChange={(e) => setInputTable(e.target.value)}
                              >
                                <option value="">Select Table</option>
                              </select>
                            </div>
                          </div>
                          <div className="text-right mt-3">
                            <button
                              type="button"
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                            >
                              <i className="bi bi-plus-circle mr-1"></i>Create Table
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Output Format */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Output Format</label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="mb-4">
                        <select
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                          value={outputTarget}
                          onChange={(e) => setOutputTarget(e.target.value)}
                        >
                          <option value="csv">CSV File</option>
                          <option value="excel">Excel File</option>
                          <option value="db">Database</option>
                        </select>
                      </div>

                      {/* Database Output Section */}
                      {outputTarget === 'db' && (
                        <div className="mt-3">
                          <label className="block text-sm font-bold text-gray-700 mb-2">Output Target</label>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <div>
                              <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                value={outputDatabase}
                                onChange={(e) => setOutputDatabase(e.target.value)}
                              >
                                <option value="">Select Target Database</option>
                                {allowedDatabases.map(db => (
                                  <option key={db} value={db}>{db}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                value={outputTable}
                                onChange={(e) => setOutputTable(e.target.value)}
                              >
                                <option value="">Select Target Table</option>
                              </select>
                            </div>
                          </div>
                          <div className="text-right mt-3">
                            <button
                              type="button"
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                            >
                              <i className="bi bi-plus-circle mr-1"></i>Create Table
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <i className="bi bi-play-circle mr-2"></i>Start Process
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Masterflow 