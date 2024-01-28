import { NextRequest, NextResponse } from 'next/server';
import generate from '../../llm/index';

export async function POST(req,res) {
    const body = await req.json();
    const report = await generate(body);
    
    return new Response(JSON.stringify(report));
}