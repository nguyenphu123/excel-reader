import { NextResponse } from "next/server";

import axios from "axios";
export async function POST(req: Request) {
  try {
    let { userList } = await req.json();
    let getToken = await axios.post(
      `${process.env.HOST}ManagedSystems/${process.env.systemID}/ManagedAccounts`,
      userList,
      {
        headers: {
          Authorization: process.env.AUTHORIZATION,
          key: process.env.key,
          runas: process.env.runas,
          pwd: process.env.pwd,
        },
      }
    );
    return NextResponse.json(getToken);
  } catch (error) {
    console.log("[PROGRAMS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
