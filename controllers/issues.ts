import {Request, Response} from "express"
import Issue, {IIssue} from "../models/issues"
import { ObjectId } from "mongoose"

export const postNewIssue = async(req: Request, res: Response):Promise<void> => {
    const { title, description, priority}: IIssue = req.body

    const user: ObjectId = req.body.userConfirmed._id

    const issueData = {
        title,
        description,
        priority,
        user,
        createdAt: new Date()
    }

    const issue = new Issue(issueData)

    await issue.save()

    res.status(201).json({
        issue,
        message: "Inconveniente reportado exitosamente"
    })
}