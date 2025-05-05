import { NextResponse } from "next/server";

import handleError from "@/lib/handler/error";
import { ForbiddenError, ValidationError } from "@/lib/http-errors";
import Account from "@/lib/models/account.model";
import { dbConnect } from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";

// GET api/accounts
export async function GET() {
  try {
    await dbConnect();

    const accounts = await Account.find();
    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// POST api/accounts
export async function POST(request: Request) {
  const body = await request.json();

  try {
    const validatedData = AccountSchema.safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    await dbConnect();

    const existingAccount = await Account.findOne({
      provider: validatedData.data.provider,
      providerAccountId: validatedData.data.providerAccountId,
    });

    if (existingAccount) {
      throw new ForbiddenError(
        "An account with the same provider already exists."
      );
    }

    const newAccount = await Account.create(validatedData.data);

    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
