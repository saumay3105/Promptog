'use client'

import { useState } from 'react';
import { useSession  } from 'next-auth/react';
import { useRouter  } from 'next/router';
import Form from '@components/Form'

const CreatePrompt = () => {
  return (
    <Form/>
  )
}

export default CreatePrompt;