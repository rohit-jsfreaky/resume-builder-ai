import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Layout, LayoutGrid } from 'lucide-react'
import Summary from './forms/Summary'
import ExpreinceForm from './forms/ExpreinceForm'
import Education from './forms/Education'
import Skills from './forms/Skills'
import { Navigate, useParams } from 'react-router-dom'
import ThemeColor from './ThemeColor'

const FormSection = () => {
  const [activeFormIndex , setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const {resumeId}= useParams();
  return (
    <div>
      <div className='flex justify-between items-center'>
          <ThemeColor/>
        <div className='flex gap-2'>
          {
            activeFormIndex > 1 && (<Button size="sm"  onClick={()=>{setActiveFormIndex(activeFormIndex-1)}}> <ArrowLeft/></Button>)
          }
        <Button 
        disabled={!enableNext}
        className="flex gap-2" size="sm" onClick={()=>{setActiveFormIndex(activeFormIndex+1)}}>Next <ArrowRight/></Button>
        </div>
      </div>
      {
        activeFormIndex===1 ? <PersonalDetails enableNext={(v)=>setEnableNext(v)}/> : activeFormIndex===2 ? <Summary enableNext={(v)=>setEnableNext(v)}/> : activeFormIndex===3 ? <ExpreinceForm enableNext={(v)=>setEnableNext(v)}/> : activeFormIndex===4 ? <Education enableNext={(v)=>setEnableNext(v)}/> : activeFormIndex === 5 ? <Skills enableNext={(v)=>setEnableNext(v)}/> : activeFormIndex ===6 ? <Navigate to={"/my-resume/"+resumeId+"/view"} /> : null
      }
      
    </div>
  )
}

export default FormSection
