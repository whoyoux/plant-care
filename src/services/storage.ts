"server-only";

import { UTApi } from "uploadthing/server";
export const utapi = new UTApi();

// import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import { Upload } from "@aws-sdk/lib-storage";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// if (
// 	!process.env.R2_ENDPOINT ||
// 	!process.env.R2_ACCESS_KEY ||
// 	!process.env.R2_SECRET_ACCESS_KEY ||
// 	!process.env.R2_BUCKET_NAME
// ) {
// 	throw new Error("env R2 is not defined! Aborted.");
// }

// export const S3 = new S3Client({
// 	region: "auto",
// 	endpoint: process.env.R2_ENDPOINT,
// 	credentials: {
// 		accessKeyId: process.env.R2_ACCESS_KEY,
// 		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
// 	},
// });

type ReturnUploadImage =
	| {
			success: true;
			url: string;
			key: string;
	  }
	| {
			success: false;
			error: string;
	  };

export const uploadImage = async (
	file: File,
	userId: string,
): Promise<ReturnUploadImage> => {
	//
	const res = await utapi.uploadFiles(
		new File([file], `${Date.now().toString()}-${userId}-${file.name}`),
		{ metadata: { userId } },
	);

	if (res.error) {
		console.log("Error uploading file", res.error.message);
		return {
			success: false,
			error: res.error.message,
		};
	}

	return {
		success: true,
		key: res.data.key,
		url: res.data.url,
	};
};

// export const uploadImage = async (
// 	file: File,
// 	userId: string,
// ): Promise<ReturnUploadImage> => {
// 	try {
// 		const parallelUploads = new Upload({
// 			client: S3,
// 			params: {
// 				Bucket: process.env.R2_BUCKET_NAME,
// 				Key: `image/${userId}/${Date.now().toString()}/${file.name}`,
// 				Body: file.stream(),
// 				ACL: "public-read",
// 				ContentType: file.type,
// 				Metadata: {
// 					userId: userId,
// 				},
// 			},
// 			queueSize: 4,
// 			leavePartsOnError: false,
// 		});

// 		const res = await parallelUploads.done();

// 		if (!res.Location || !res.Key) {
// 			return {
// 				success: false,
// 				error: "Failed to upload a file.",
// 			};
// 		}

// 		const url = await GetImageURL(res.Key);

// 		return {
// 			success: true,
// 			url,
// 			key: res.Key,
// 		};
// 	} catch (err) {
// 		console.error(err);
// 		return {
// 			success: false,
// 			error: "Failed to upload a file.",
// 		};
// 	}
// };

// export const GetImageURL = async (key: string) => {
// 	const res = await getSignedUrl(
// 		S3,
// 		new GetObjectCommand({
// 			Bucket: process.env.R2_BUCKET_NAME,
// 			Key: key,
// 		}),
// 	);
// 	return res;
// };
