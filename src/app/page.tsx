'use client';
import React from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function Page() {
  const [data, setData] = React.useState(null)
  const [inputQuery, setInputQuery] = React.useState('')

  const getData = async () => {
    try {
      const response = await axios.post(
        'https://vit-tm-task.api.trademarkia.app/api/v3/us',
        {
          input_query: inputQuery, // Get value from input field
          input_query_type: "",
          sort_by: "default",
          status: [],
          exact_match: false,
          date_query: false,
          owners: [],
          attorneys: [],
          law_firms: [],
          mark_description_description: [],
          classes: [],
          page: 1,
          rows: 10,
          sort_order: "desc",
          states: [],
          counties: []
        },
        {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          }
        }
      );
      setData(response.data); // Store the response data
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col p-4'>
      <div className='flex flex-row space-x-2'>
        <Input
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Enter query"
        />
        <Button onClick={getData}>Search</Button>
      </div>
      
      <div className='mt-4'>
        {data && (
          <pre className='bg-gray-100 p-4 rounded'>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}

export default Page;
