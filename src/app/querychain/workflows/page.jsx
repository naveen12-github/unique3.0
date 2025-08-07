'use client'
import React, { useState } from 'react'

const Workflow = () => {
  const [activeTab, setActiveTab] = useState('workflow')

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-4">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <nav aria-label="breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li className="flex items-center">
                  <a href="javascript:void(0);" className="text-blue-600 hover:text-blue-800">Query Chain</a>
                </li>
                <li className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="font-bold text-gray-900">Workflows Config</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="w-full">
          {/* Commented out sections as in original */}
          {/* <div className="flex justify-end mb-3">
            <button className="btn btn-primary skeleton-popup disabled" data-token="@skeletonToken('central_unique_workflows')_a">
              <i className="ri-git-branch-fill me-2"></i>Add Config
            </button>
          </div> */}
          {/* <div className="card mb-4 p-4">
            <div className="card-body">
              <div data-skeleton-table-set="@skeletonToken('central_unique_workflows' )_t"></div>
            </div>
          </div> */}
        </div>

        <div className="w-full">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-center">
                <ul className="flex space-x-1" role="tablist">
                  <li>
                    <button 
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'workflow' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      role="tab" 
                      aria-selected={activeTab === 'workflow'}
                      onClick={() => setActiveTab('workflow')}
                    >
                      Workflows Config
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'processes' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      role="tab" 
                      aria-selected={activeTab === 'processes'}
                      onClick={() => setActiveTab('processes')}
                    >
                      Process Config
                    </button>
                  </li>
                </ul>
                <div className="action-area">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    {activeTab === 'workflow' ? 'Add Workflow' : 'Add Process'}
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div 
                  className={`${activeTab === 'workflow' ? 'block' : 'hidden'}`}
                  role="tabpanel" 
                  aria-labelledby="workflow-tab"
                >
                  <div data-skeleton-table-set="@skeletonToken('central_unique_workflows')_t">
                    {/* Workflows table content will go here */}
                    <div className="text-center py-8">
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">Workflows Configuration</h5>
                      <p className="text-gray-500">Workflows table will be displayed here</p>
                    </div>
                  </div>
                </div>
                <div 
                  className={`${activeTab === 'processes' ? 'block' : 'hidden'}`}
                  role="tabpanel" 
                  aria-labelledby="processes-tab"
                >
                  <div data-skeleton-table-set="@skeletonToken('central_unique_processes')_t">
                    {/* Processes table content will go here */}
                    <div className="text-center py-8">
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">Process Configuration</h5>
                      <p className="text-gray-500">Processes table will be displayed here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workflow 